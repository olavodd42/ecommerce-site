import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redireciona para a página inicial se estiver autenticado
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <div>Meus Pedidos</div>;
      case 'wishlist':
        return <div>Minha Lista de Desejos</div>;
      case 'account':
        return <div>Minha Conta</div>;
      case 'settings':
        return <div>Configurações</div>;
      case 'cards':
        return <div>Meus Cartões</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Minha Conta</h1>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-1/5 py-4 text-center text-sm font-medium ${
                activeTab === 'orders'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Meus Pedidos
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-1/5 py-4 text-center text-sm font-medium ${
                activeTab === 'wishlist'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Minha Lista de Desejos
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-1/5 py-4 text-center text-sm font-medium ${
                activeTab === 'account'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Minha Conta
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-1/5 py-4 text-center text-sm font-medium ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Configurações
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`w-1/5 py-4 text-center text-sm font-medium ${
                activeTab === 'cards'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Meus Cartões
            </button>
          </div>
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
