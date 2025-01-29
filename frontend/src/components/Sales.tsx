import React, { useRef } from 'react';
import axios from 'axios';

interface InputFieldProps {
    label: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    required?: boolean;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = React.memo(({ label, type, value, onChange, onBlur, required, error }) => (
    <div className="mb-4 relative">
        <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={label.toLowerCase()}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 ${
                error ? "border-red-500" : "focus:ring-blue-400 focus:border-blue-400"
            }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
));

const Sales = () => {
    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [freight, setFreight] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [pairs, setPairs] = React.useState([{ key: '', value: '' }]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const imageInputRef = useRef<HTMLInputElement | null>(null); // Referência para o input de imagem

    const formatCurrency = (value: string) => {
        const numberValue = parseFloat(value.replace(',', '.'));
        if (isNaN(numberValue)) return '';
        return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleFreightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFreight(e.target.value);
    };

    const handleBlurFormat = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return () => {
            setter((prev) => formatCurrency(prev));
        };
    };

    const sales = [
        {
            label: "Nome",
            type: "text",
            value: name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
            required: true,
            error: errors.name,
        },
        {
            label: "Categoria",
            type: "text",
            value: category,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value),
            required: true,
            error: errors.category,
        },
        {
            label: "Preço",
            type: "text",
            value: price,
            onChange: handlePriceChange,
            onBlur: handleBlurFormat(setPrice),
            required: true,
            error: errors.price,
        },
        {
            label: "Quantidade",
            type: "number",
            value: quantity,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value),
            required: true,
            error: errors.quantity,
        },
        {
            label: "Frete",
            type: "text",
            value: freight,
            onChange: handleFreightChange,
            onBlur: handleBlurFormat(setFreight),
            required: true,
            error: errors.freight,
        }
    ];

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!name) newErrors.name = "O nome é obrigatório.";
        if (!category) newErrors.category = "A categoria é obrigatória.";
        if (!price) newErrors.price = "O preço é obrigatório.";
        if (!quantity) newErrors.quantity = "A quantidade é obrigatória.";
        if (!description) newErrors.description = "A descrição é obrigatória.";
        if (!image) newErrors.image = "A imagem é obrigatória.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            
            setImagePreview(URL.createObjectURL(file));
        }
    };

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

        if (!validateForm()) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('category', category);
            formData.append('price', price.replace(',', '.'));
            formData.append('quantity', quantity);
            formData.append('freight', freight.replace(',', '.'));
            formData.append('description', description);
            formData.append('specs', JSON.stringify(generateJson()));
            if (image) formData.append('image', image);

            await axios.post("http://localhost:4000/api/products/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            setSuccess(true);
            // Resetar o formulário
            setName("");
            setCategory("");
            setPrice("");
            setQuantity("");
            setFreight("");
            setDescription("");
            setImage(null);
            setImagePreview(null);
            setPairs([{ key: '', value: '' }]);
            if (imageInputRef.current) {
                imageInputRef.current.value = ''; // Resetar o input de imagem
            }
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
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    {sales.map((field, index) => (
                        <InputField key={index} {...field} />
                    ))}
                    <div className="mb-4 relative">
                        <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                            Descrição do Produto<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="product-description"
                            name="product-description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.description ? "border-red-500" :
                                "focus:ring-blue-400 focus:border-blue-400"}`}
                            placeholder="Insira a descrição do produto aqui..."
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            {description.length}/500 caracteres
                        </p>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="product-specs" className="block text-sm font-medium text-gray-700">
                            Especificações do Produto<span className="text-red-500">*</span>
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
                        {errors.specs && <p className="text-red-500 text-sm mt-1">{errors.specs}</p>}
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
                            name="image"
                            ref={imageInputRef} // Adicione a referência ao input de imagem
                            onChange={(e) => handleImageChange(e)}
                            className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                                ${errors.image ? "border-red-500" : "focus:ring-blue-400 focus:border-blue-400"}`}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        {imagePreview && (
                            <div className="mt-4 z-40">
                                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg">
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setName("");
                                setCategory("");
                                setPrice("");
                                setQuantity("");
                                setFreight("");
                                setDescription("");
                                setImage(null);
                                setPairs([{ key: '', value: '' }]);
                                setError(null);
                                setSuccess(false);
                                if (imageInputRef.current) {
                                    imageInputRef.current.value = ''; // Resetar o input de imagem
                                }
                            }}
                            className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                        Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sales;