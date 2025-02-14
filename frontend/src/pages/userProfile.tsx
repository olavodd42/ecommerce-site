import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Orders from '../components/Orders.tsx';
import Config from '../components/Config.tsx';
import Account from '../components/Account.tsx';
import Sales from '../components/Sales.tsx';
import Wishlist from '../components/Wishlist.tsx';
import Cards from '../components/Cards.tsx';
import MyProducts from '../components/myProducts.tsx';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  // Array de abas para facilitar a renderização e manutenção
  const tabs = [
    { key: 'orders', label: 'Meus Pedidos' },
    { key: 'wishlist', label: 'Lista de Desejos' },
    { key: 'account', label: 'Minha Conta' },
    { key: 'settings', label: 'Configurações' },
    { key: 'cards', label: 'Meus Cartões' },
    { key: 'sales', label: 'Vendas' },
    { key: 'myproducts', label: 'Meus Produtos' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <Orders />;
      case 'wishlist':
        return <Wishlist />;
      case 'account':
        return <Account />;
      case 'settings':
        return <Config />;
      case 'cards':
        return <Cards />;
      case 'sales':
        return <Sales />;
      case 'myproducts':
        return <MyProducts />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Minha Conta</h1>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Barra de navegação das abas */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Conteúdo da aba ativa */}
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;