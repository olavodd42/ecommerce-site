import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart, faBagShopping } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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

  const addFav = async (productId) => {
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
    alert(`Redirecionando para checkout com ${quantity} unidade(s) de ${product.name}!`);
    navigate('/checkout', { state: { fromProduct: true, productID: product.id, quantity } });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg">Carregando...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-12">
          {product.name}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagem do Produto */}
          <div className="flex justify-center">
            <img 
              src={`http://localhost:4000${product.image}`} 
              alt={product.name} 
              className="max-h-96 object-contain" 
            />
          </div>
          {/* Detalhes do Produto */}
          <div className="space-y-10">
            <div>
              <p className="text-3xl font-light text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}
              </p>
              <div className="flex items-center mt-4 space-x-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={addToCart}
                className="flex items-center justify-center py-3 border border-gray-300 rounded text-gray-900 hover:bg-gray-50 transition"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Adicionar ao Carrinho
              </button>
              <button 
                onClick={buyNow}
                className="flex items-center justify-center py-3 border border-gray-300 rounded text-gray-900 hover:bg-gray-50 transition"
              >
                <FontAwesomeIcon icon={faBagShopping} className="mr-2" />
                Comprar Agora
              </button>
            </div>
            <button 
              onClick={() => addFav(product.id)}
              className="flex items-center justify-center py-3 border border-gray-300 rounded text-gray-900 hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
              Adicionar aos Favoritos
            </button>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div className="border-b pb-2">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500">Categoria</h3>
                  <p className="text-lg">{product.category}</p>
                </div>
                <div className="border-b pb-2">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500">Estoque</h3>
                  <p className="text-lg">{product.countInStock} unidades</p>
                </div>
                <div className="border-b pb-2 col-span-2">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500">Frete</h3>
                  <p className="text-lg">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.freight)}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">Descrição do Produto</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">Especificações Técnicas</h2>
                {product.specs && typeof product.specs === 'object' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="border-b pb-2">
                        <dt className="text-sm text-gray-500">{key}</dt>
                        <dd className="text-lg text-gray-900">{String(value)}</dd>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Nenhuma especificação disponível</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
