import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [parcel, setParcel] = useState('1'); // Parcelas
  const [cart, setCart] = useState<{id: string; userId: String, items: { id: string, product: { id: number; name: string; price: number }; quantity: number }[] } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica origem da compra
  const fromCart = location.state?.fromCart || false;
  const fromProduct = location.state?.fromProduct || false;
  const productId = location.state?.productID || null;
  const quantity = location.state?.quantity || 1;
  const token = localStorage.getItem('authToken');

  const [totalAmount, setTotalAmount] = useState(0);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem('user');
        if (!user) {
          throw new Error('Usuário não autenticado');
        }

        const user_id = JSON.parse(user).id;

        if (fromCart) {
          const response = await axios.get('http://localhost:4000/api/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
              'user': user_id
            },
          });
          
          setCart(response.data);
          const total = response.data.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          setTotalAmount(total);
        } else if (fromProduct && productId) {
          const response = await axios.get(`http://localhost:4000/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setProductDetails(response.data);
          setTotalAmount(response.data.price * quantity);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, [fromCart, fromProduct, productId, quantity, token]);

  const installmentValue = paymentMethod === 'credit_card' ? (totalAmount / Number(parcel)).toFixed(2) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      let orderData = {};

      if (fromCart && cart?.items) {
        orderData = {
          products: cart.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity
          }))
        };
        response = await axios.post('http://localhost:4000/api/checkout/from-cart', orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (fromProduct && productId) {
        orderData = { productId, quantity };
        response = await axios.post('http://localhost:4000/api/checkout/direct', orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        throw new Error('Erro ao finalizar compra');
      }

      if (response.status !== 201) throw new Error('Erro ao processar a compra');
      
      alert('Compra realizada com sucesso!');
      navigate('/'); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-md px-4">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Finalizar Compra</h2>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Resumo da Compra</h3>
          {fromCart ? (
            <ul>
              {cart?.items?.map((item) => (
                <li key={item.id} className="flex justify-between text-gray-700">
                  <span>{item.product.name} ({item.quantity}x)</span>
                  <span>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            productDetails && (
              <p className="text-gray-700">
                {productDetails.name} ({quantity}x) - {" "}
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalAmount)}
              </p>
            )
          )}

          <div className="mt-2 text-lg font-bold text-gray-900">
            Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalAmount)}
          </div>

          {paymentMethod === 'credit_card' && (
            <div className="mt-2 text-gray-700">
              {parcel}x de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(installmentValue))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Método de Pagamento</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="credit_card">Cartão de Crédito</option>
              <option value="pix">PIX</option>
              <option value="boleto">Boleto Bancário</option>
            </select>
          </div>

          {paymentMethod === 'credit_card' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de Parcelas</label>
              <select value={parcel} onChange={(e) => setParcel(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg">
                {[...Array(12).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}x {num + 1 <= 10 ? "sem juros" : "com juros"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 mt-4">
            Confirmar Compra
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
