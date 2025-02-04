import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";
import Image from "./img.png";
import { useAuth } from "../context/authProvider.tsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleCategories = () => setShowCategories(!showCategories);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-md fixed w-full z-50 h-16 flex items-center">
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={Image} alt="EloShop Logo" className="w-12 h-12 object-contain" />
          <span className="text-2xl font-bold tracking-wide">EloShop</span>
        </Link>

        {/* Menu de Categorias */}
        <div className="relative hidden lg:block">
          <button
            onClick={toggleCategories}
            className="flex items-center text-sm font-medium hover:text-gray-300 transition"
          >
            Categorias <MenuIcon className="w-5 h-5 ml-2" />
          </button>
          {showCategories && (
            <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48 p-2">
              <ul className="flex flex-col space-y-2">
                <li><Link to="/electronics" className="block px-4 py-2 hover:bg-gray-100 rounded">Eletrônicos</Link></li>
                <li><Link to="/clothing" className="block px-4 py-2 hover:bg-gray-100 rounded">Roupas</Link></li>
                <li><Link to="/home-appliances" className="block px-4 py-2 hover:bg-gray-100 rounded">Eletrodomésticos</Link></li>
                <li><Link to="/sports" className="block px-4 py-2 hover:bg-gray-100 rounded">Esportes</Link></li>
              </ul>
            </div>
          )}
        </div>

        {/* Navegação Principal */}
        <ul className="hidden lg:flex space-x-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
          <li><Link to="/cart" className="hover:text-gray-300 transition">Carrinho</Link></li>
          <li><Link to="/bestsellers" className="hover:text-gray-300 transition">Mais Vendidos</Link></li>
        </ul>

        {/* Ações */}
        <div className="flex items-center space-x-5">
          <Link to="/search" className="hover:text-gray-300">
            <SearchIcon className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="hover:text-gray-300 relative">
            <ShoppingCartIcon className="w-5 h-5" />
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link to="/user" className="hover:text-gray-300 flex items-center">
                <UserIcon className="w-5 h-5" />
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium hover:text-gray-300">
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Entrar</Link>
          )}

          {/* Menu Mobile */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden focus:outline-none">
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-gray-800 shadow-lg absolute top-16 w-full left-0 p-4">
          <ul className="flex flex-col space-y-3 text-sm font-medium">
            <li><Link to="/" className="block px-4 py-2 hover:bg-gray-100 rounded">Home</Link></li>
            <li><Link to="/cart" className="block px-4 py-2 hover:bg-gray-100 rounded">Carrinho</Link></li>
            <li><Link to="/bestsellers" className="block px-4 py-2 hover:bg-gray-100 rounded">Mais Vendidos</Link></li>
            <li><Link to="/login" className="block px-4 py-2 hover:bg-gray-100 rounded">Login</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;