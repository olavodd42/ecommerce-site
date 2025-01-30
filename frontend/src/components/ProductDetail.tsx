import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams(); // Extrai o ID da URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Produto não encontrado');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center pt-28">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center pt-28 text-red-500">{error}</div>;
    }

    return (
        <div className="z-0 pt-28 w-full min-h-screen mx-auto px-4 bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-6">{product.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={`http://localhost:4000${product.image}`} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
                </div>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold">Categoria</h2>
                        <p className="text-gray-700">{product.category}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Preço</h2>
                        <p className="text-gray-700">R$ {product.price}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Quantidade em Estoque</h2>
                        <p className="text-gray-700">{product.countInStock}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Frete</h2>
                        <p className="text-gray-700">R$ {product.freight}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Descrição</h2>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Especificações</h2>
                        <table className="w-full border-collapse">
                            <tbody>
                            {product.specs && typeof product.specs === 'object' ? (
                                Object.entries(product.specs).map(([key, value]) => (
                                <tr key={key} className="border-b">
                                    <td className="py-2 font-semibold">{key}</td>
                                    <td className="py-2 text-gray-700">{value}</td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan={2} className="py-2 text-gray-500 text-center">
                                    Nenhuma especificação disponível
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;