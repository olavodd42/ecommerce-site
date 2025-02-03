import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  interface CartItem {
    cartId: string;
    createdAt: string;
    id: string;
    product: { // ⚠️ Corrigido de Product para product
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
        console.log(data)
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
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Carrinho de Compras
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cart?.items?.map(item => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 mb-4">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <img 
                  src={item.product?.image ? `http://localhost:4000${item.product.image}` : '/placeholder.png'}
                  alt={item.product?.name || 'Produto sem nome'}
                  className="h-20 w-20 object-contain"
                />



                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        value={item.quantity}
                        className="w-10 text-center text-sm font-medium text-gray-900"
                        readOnly
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-end md:w-32">
                      <p className="text-base font-bold text-gray-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  <div className="w-full min-w-0 flex-1 space-y-4 md:max-w-md">
                    <h3 className="text-base font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-1.5 h-4 w-4" />
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Seção de Resumo */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900">Resumo da Compra</p>
              
              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
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

              <button onClick={() => navigate('/checkout', { state: { fromCart: true } })}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
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