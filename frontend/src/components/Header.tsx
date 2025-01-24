import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";
import Image from './img.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => setShowCategories(!showCategories);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-md fixed w-full z-50 h-16">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo e Categorias */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src={Image}
              alt="Logo EloShop"
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold tracking-tight">EloShop</span>
          </div>

          {/* Menu de Categorias */}
          <div className="relative">
            <button
              onClick={toggleCategories}
              className="flex items-center space-x-2 text-sm font-medium hover:text-gray-300 transition"
            >
              <span>Categorias</span>
              <MenuIcon className="w-5 h-5" />
            </button>
            {showCategories && (
              <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48">
                <ul className="flex flex-col p-4 space-y-2">
                  <li>
                    <Link
                      to="/electronics"
                      className="hover:text-blue-600 transition"
                    >
                      Eletrônicos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/clothing"
                      className="hover:text-blue-600 transition"
                    >
                      Roupas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home-appliances"
                      className="hover:text-blue-600 transition"
                    >
                      Eletrodomésticos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/sports"
                      className="hover:text-blue-600 transition"
                    >
                      Esportes
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Links de Navegação (Desktop) */}
        <ul className="hidden lg:flex space-x-8">
          <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
          <li><Link to="/cart" className="hover:text-gray-300 transition">Carrinho</Link></li>
          <li><Link to="/bestsellers" className="hover:text-gray-300 transition">Mais Vendidos</Link></li>
          {/* <li><Link to="/login" className="hover:text-gray-300 transition">Login</Link></li> */}
        </ul>

        {/* Ações e Menu Mobile */}
        <div className="flex items-center space-x-6">
          <Link to="/search">
            <SearchIcon className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          </Link>
          <Link to="/cart">
            <ShoppingCartIcon className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          </Link>
          <Link to="/login">
            <UserIcon className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          </Link>

          {/* Botão do Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden focus:outline-none"
          >
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-start gap-y-2 p-4">
            <li><Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link></li>
            <li><Link to="/cart" className="text-gray-800 hover:text-blue-600">Carrinho</Link></li>
            <li><Link to="/bestsellers" className="text-gray-800 hover:text-blue-600">Mais Vendidos</Link></li>
            {/* <li><Link to="/login" className="text-gray-800 hover:text-blue-600">Login</Link></li> */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
