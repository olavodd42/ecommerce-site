import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  interface CartItem {
    cartId: string;
    createdAt: string;
    id: string;
    product: {
      category: string;
      createdAt: string;
      description: string;
      freight: number;
      id: number;
      image: string;
      name: string;
      price: number;
      quantity: number;
      sales: number;
      specs: JSON;
      updatedAt: string;
      user_id: string;
    };
    productId: number;
    quantity: number;
  }

  interface Cart {
    createdAt: string;
    id: string;
    items: CartItem[];
    updatedAt: string;
    userId: string;
  }

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        if (!user) throw new Error('Usuário não autenticado');
        if (!token) throw new Error('Token não encontrado');

        const parsedUser = JSON.parse(user);

        const response = await fetch('http://localhost:4000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
            'user': parsedUser.id // Incluindo o ID do usuário no cabeçalho
          }
        });

        if (!response.ok) throw new Error('Erro ao carregar carrinho');
        
        const data = await response.json();
        setCart(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:4000/api/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar quantidade');
      
      // Atualizar estado local
      setCart(prev => prev ? ({
        ...prev,
        items: prev.items.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      }) : prev);
    } catch (error) {
      alert(error.message);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:4000/api/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Erro ao remover item');
      
      setCart(prev => prev ? ({
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      }) : prev);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div className="text-center pt-28">Carregando...</div>;
  if (error) return <div className="text-center pt-28 text-red-500">{error}</div>;

  return (
    <section className="bg-gray-50 py-12 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl mb-8">
          Carrinho de Compras
        </h2>

        <div className="lg:flex lg:items-start lg:gap-8">
          {/* Lista de Itens */}
          <div className="w-full lg:max-w-2xl">
            {cart?.items?.map(item => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm mb-6">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.product?.image ? `http://localhost:4000${item.product.image}` : '/placeholder.png'}
                      alt={item.product?.name || 'Produto sem nome'}
                      className="h-20 w-20 object-contain rounded"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.product.description.substring(0, 60)}...
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:flex md:items-center">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        value={item.quantity}
                        className="w-12 text-center text-sm font-medium text-gray-900 border-l border-r border-gray-200"
                        readOnly
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.product.price * item.quantity)}
                      </p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="mt-2 inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-1 h-4 w-4" />
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo da Compra */}
          <div className="mt-8 lg:mt-0 lg:w-full lg:max-w-md">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xl font-semibold text-gray-900 mb-4">Resumo da Compra</p>
              
              <div className="border-t border-gray-200 pt-4">
                <dl className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-base font-semibold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(
                      cart?.items?.reduce((total, item) => 
                        total + (item.product.price * item.quantity), 0
                      ) || 0
                    )}
                  </dd>
                </dl>
              </div>

              <button 
                onClick={() => navigate('/checkout', { state: { fromCart: true } })}
                className="mt-6 w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white hover:bg-gray-800 transition duration-300"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
