import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider.tsx";
import { FaEdit, FaCheck } from "react-icons/fa";
import axios from "axios";

const ProductEdit = () => {
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [file, setFile] = useState<File | null>(null);
    const [isEditable, setIsEditable] = useState({
        name : false,
        category: false,
        price: false,
        quantity: false,
        sales: false,
        freight: false,
        description: false,
        specs: false,
        image: false,
    });
    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: 0,
        quantity: 0,
        sales: 0,
        freight: 0,
        description: "",
        specs: {},
        image: "",
    });
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        if (!token) {
            navigate("/login");
            console.log("Token não encontrado");
        }
    }, [token]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const toggleEdit = (field: string) => {
        setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            setLoading(true);
            const payload = {
                name: product.name,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
                sales: product.sales,
                freight: product.freight,
                description: product.description,
                specs: product.specs,
                image: product.image,
            };

            await axios.put(
                `http://localhost:4000/api/products/${id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );

            setSuccess(true);
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.error || "Erro ao atualizar usuário. Tente novamente mais tarde."
            );
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: string) => {
            const numberValue = parseFloat(value || '0');
            return numberValue.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        };
    
        const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/\D/g, ''); // Remove todos os não dígitos
            const numericValue = (Number(rawValue) / 100).toFixed(2); // Converte para decimal
            setProduct({...product, price: parseFloat(numericValue)});
            // console.log(price)
        };
        
        const handleFreightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/\D/g, '');
            const numericValue = (Number(rawValue) / 100).toFixed(2);
            setProduct({...product, freight: parseFloat(numericValue)});
        };

        
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-center mb-6">Atualizar Produto</h1>
        
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        {success && <p className="text-green-500 text-center mb-4">Informações atualizadas com sucesso!</p>}
        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 relative">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={product.name}
                                    onChange={(e) => setProduct({...product, name: e.target.value})}
                                    disabled={!isEditable.name}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                        isEditable.name ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleEdit("name")}
                                    className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                                >
                                    {isEditable.name ? <FaCheck /> : <FaEdit />}
                                </button>
                            </div>
                            <div className="mb-4 relative">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Categoria
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    value={product.category}
                                    onChange={(e) => setProduct({...product, category: e.target.value})}
                                    disabled={!isEditable.category}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                        isEditable.category ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleEdit("category")}
                                    className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                                >
                                    {isEditable.category ? <FaCheck /> : <FaEdit />}
                                </button>
                            </div>
                            <div className="mb-4 relative">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Preço
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    value={formatCurrency(product.price.toString())}
                                    onChange={handlePriceChange}
                                    disabled={!isEditable.price}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                        isEditable.price ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleEdit("price")}
                                    className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                                >
                                    {isEditable.price ? <FaCheck /> : <FaEdit />}
                                </button>
                            </div>
                            <div className="mb-4 relative">
                                <label htmlFor="freight" className="block text-sm font-medium text-gray-700">
                                    Frete
                                </label>
                                <input
                                    type="text"
                                    id="freight"
                                    value={formatCurrency(product.freight.toString())}
                                    onChange={handleFreightChange}
                                    disabled={!isEditable.freight}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                        isEditable.freight ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleEdit("freight")}
                                    className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                                >
                                    {isEditable.freight ? <FaCheck /> : <FaEdit />}
                                </button>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    Quantidade
                                </label>
                                <input
                                    type="text"
                                    id="quantity"
                                    value={product.quantity}
                                    onChange={(e) => setProduct({...product, quantity: parseInt(e.target.value)})}
                                    disabled={!isEditable.quantity}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                        isEditable.quantity ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleEdit("quantity")}
                                    className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                                >
                                    {isEditable.quantity ? <FaCheck /> : <FaEdit />}
                                </button>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    value={product.description}
                                    onChange={(e) => setProduct({...product, description: e.target.value})}
                                    disabled={!isEditable.description}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                        isEditable.description ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleEdit("description")}
                                    className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                                >
                                    {isEditable.description ? <FaCheck /> : <FaEdit />}
                                </button>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="specs" className="block text-sm font-medium text-gray-700">
                                    Especificações
                                </label>
                                
                                {isEditable.specs ? (
                                    <textarea
                                    id="specs"
                                    value={JSON.stringify(product.specs, null, 2)}
                                    onChange={(e) => {
                                        try {
                                        const parsedValue = JSON.parse(e.target.value);
                                        setProduct({...product, specs: parsedValue});
                                        setError(null);
                                        } catch (err) {
                                        setError("Formato JSON inválido. Use { \"chave\": \"valor\" }");
                                        }
                                    }}
                                    className="w-full h-48 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm"
                                    placeholder={`Exemplo de formato válido:\n{\n  "material": "algodão",\n  "tamanho": "M"\n}`}
                                    />
                                ) : (
                                    <pre className="w-full border p-2 rounded-lg bg-gray-100 overflow-x-auto">
                                    {JSON.stringify(product.specs, null, 2)}
                                    </pre>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                    if (!isEditable.specs) {
                                        setError(null); // Limpa erros ao iniciar a edição
                                    }
                                    toggleEdit("specs");
                                    }}
                                    className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                                >
                                    {isEditable.specs ? <FaCheck /> : <FaEdit />}
                                </button>
                                </div>
                                <div className="mb-4 relative">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        Imagem
                                    </label>
                                    
                                    {/* Preview da imagem */}
                                    {product.image && (
                                        <img 
                                            src={`http://localhost:4000${product.image}`} 
                                            alt="Preview" 
                                            className="w-32 h-32 object-cover mb-2 rounded-lg border"
                                            onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                                        />
                                    )}
                                    
                                    <input
                                        type="text"
                                        id="image"
                                        value={product.image}
                                        onChange={(e) => setProduct({...product, image: e.target.value})}
                                        disabled={!isEditable.image}
                                        className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                            isEditable.image ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                        }`}
                                        placeholder="URL da imagem ou caminho do arquivo"
                                    />
                                    
                                    <button
                                        type="button"
                                        onClick={() => toggleEdit("image")}
                                        className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                                    >
                                        {isEditable.image ? <FaCheck /> : <FaEdit />}
                                    </button>
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
}

export default ProductEdit;