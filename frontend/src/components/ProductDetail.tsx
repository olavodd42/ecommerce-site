import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

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

    const addFav = async (productId: string) => {
        try {
          const token = localStorage.getItem('authToken');
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          
          if (!user?.id || !token) {
            throw new Error('Você precisa estar logado');
          }
      
          const response = await fetch(
            `http://localhost:4000/api/users/${user.id}/wishlist/${productId}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          const data = await response.json();
          
          if (!response.ok) throw new Error(data.error || 'Erro na requisição');
          
          alert('Produto adicionado aos favoritos!');
        } catch (error) {
          alert(error.message);
        }
      };

      const addToCart = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await fetch('http://localhost:4000/api/cart/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: quantity
            })
          });
      
          if (!response.ok) throw new Error('Erro ao adicionar ao carrinho');
          
          alert('Produto adicionado ao carrinho!');
        } catch (error) {
          alert(error.message);
        }
      };
      
    const buyNow = () => {
        // Lógica para compra imediata
        alert(`Redirecionando para checkout com ${quantity} unidade(s) de ${product.name}!`);
        navigate('/checkout', { state: { fromProduct: true, productID: product.id, quantity } });
    };

    if (loading) {
        return <div className="text-center pt-28">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center pt-28 text-red-500">{error}</div>;
    }

    return (
        <div className="z-0 pt-28 w-full min-h-screen mx-auto px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">{product.name}</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Seção da Imagem */}
                    <div className="relative group">
                        <img 
                            src={`http://localhost:4000${product.image}`} 
                            alt={product.name} 
                            className="w-full h-96 object-contain rounded-xl border-2 border-gray-100 p-4 transition-transform duration-300 hover:scale-105" 
                        />
                    </div>

                    {/* Seção de Informações */}
                    <div className="space-y-8">
                        {/* Preço e Ações */}
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl font-bold text-blue-600">
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(product.price)}
                                </span>
                                <div className="flex items-center space-x-3">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-1 bg-gray-200 rounded-lg text-xl"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl w-8 text-center">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-1 bg-gray-200 rounded-lg text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button 
                                    onClick={addToCart}
                                    className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} className="mr-3" />
                                    Adicionar ao Carrinho
                                </button>
                                <button 
                                    onClick={buyNow}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faBagShopping} className="mr-3" />
                                    Comprar Agora
                                </button>
                            </div>
                        </div>

                        {/* Botão Favoritos */}
                        <button 
                            onClick={() => addFav(product.id)}
                            className="w-full py-3 px-6 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-xl font-semibold transition-colors flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faStar} className="mr-3 text-yellow-500" />
                            Adicionar aos Favoritos
                        </button>

                        {/* Detalhes do Produto */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-gray-600">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Categoria</h3>
                                    <p className="text-lg">{product.category}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Estoque</h3>
                                    <p className="text-lg">{product.countInStock} unidades</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Frete</h3>
                                    <p className="text-lg">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(product.freight)}
                                    </p>
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">Descrição do Produto</h2>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Especificações */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Especificações Técnicas</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.specs && typeof product.specs === 'object' ? (
                                        Object.entries(product.specs).map(([key, value]) => (
                                            <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
                                                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                                <dd className="mt-1 text-lg text-gray-900">{value}</dd>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">Nenhuma especificação disponível</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;