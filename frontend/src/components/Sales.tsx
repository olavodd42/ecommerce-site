import React from 'react';
import axios from 'axios';

const Sales = () => {
    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [freight, setFreight] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [specs, setSpecs] = React.useState("");
    const [image, setImage] = React.useState<File | null>(null); // Armazenar o arquivo de imagem
    const [pairs, setPairs] = React.useState([{ key: '', value: '' }]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [user_id, setUser_id] = React.useState("");

    // Função para atualizar um par de chave-valor
    const handlePairChange = (index: number, field: string, newValue: string) => {
        const updatedPairs = [...pairs];
        updatedPairs[index][field] = newValue;
        setPairs(updatedPairs);
    };

    // Função para adicionar um novo par de chave-valor
    const addPair = () => {
        setPairs([...pairs, { key: '', value: '' }]);
    };

    // Função para remover um par de chave-valor
    const removePair = (index: number) => {
        const updatedPairs = pairs.filter((_, i) => i !== index);
        setPairs(updatedPairs);
    };

    // Função para gerar o JSON de especificações
    const generateJson = () => {
        const jsonObject = pairs.reduce((acc, { key, value }) => {
            if (key && value) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, string>);
        return jsonObject;
    };

    // Função para enviar o formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            setLoading(true);

            // Criar um objeto FormData para enviar a imagem
            const formData = new FormData();
            formData.append('name', name);
            formData.append('user_id', user_id);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('freight', freight);
            formData.append('description', description);
            formData.append('specs', JSON.stringify(generateJson())); // Enviar o JSON de especificações
            if (image) {
                formData.append('image', image); // Adicionar a imagem ao FormData
            }

            // Enviar a requisição para o backend
            await axios.post("http://localhost:4000/api/products/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            setSuccess(true);
            setName("");
            setCategory("");
            setPrice("");
            setFreight("");
            setDescription("");
            setSpecs("");
            setImage(null);
            setPairs([{ key: '', value: '' }]);
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.error || "Erro ao criar o produto. Tente novamente mais tarde."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Criar Produto</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">Produto criado com sucesso!</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Categoria
                        </label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Preço
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="freight" className="block text-sm font-medium text-gray-700">
                            Frete
                        </label>
                        <input
                            type="text"
                            id="freight"
                            value={freight}
                            onChange={(e) => setFreight(e.target.value)}
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                            Descrição do Produto
                        </label>
                        <textarea
                            id="product-description"
                            name="product-description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Insira a descrição do produto aqui..."
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            {description.length}/500 caracteres
                        </p>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                            Especificações do Produto
                        </label>
                        {pairs.map((pair, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Chave"
                                        value={pair.key}
                                        onChange={(e) => handlePairChange(index, 'key', e.target.value)}
                                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Valor"
                                        value={pair.value}
                                        onChange={(e) => handlePairChange(index, 'value', e.target.value)}
                                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button
                                        onClick={() => removePair(index)}
                                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addPair}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
                        >
                            Adicionar Par
                        </button>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">JSON Gerado:</h2>
                            <pre className="bg-gray-100 p-4 rounded-md text-sm">
                                {JSON.stringify(generateJson(), null, 2)}
                            </pre>
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Imagem do Produto
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full text-white py-2 rounded-lg transition duration-300 ${
                                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sales;