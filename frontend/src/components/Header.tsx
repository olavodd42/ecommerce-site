import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
  UserIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import logo from "./img.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-sm text-gray-900 py-4 z-50 shadow-sm border-b">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-medium tracking-tight">EloShop</span>
        </Link>

        {/* Navegação */}
        <nav className="hidden md:flex space-x-8 text-sm">
          <Link to="/" className="hover:text-gray-600 transition duration-150 ease-in-out">Home</Link>
          <Link to="/bestsellers" className="hover:text-gray-600 transition duration-150 ease-in-out">Mais Vendidos</Link>
          <Link to="/categories" className="hover:text-gray-600 transition duration-150 ease-in-out">Categorias</Link>
          <Link to="/search" className="hover:text-gray-600 transition duration-150 ease-in-out flex items-center gap-1">
            <SearchIcon className="w-5 h-5" />
            <span>Pesquisa</span>
          </Link>
        </nav>

        {/* Ícones */}
        <div className="flex items-center space-x-4">
          <Link to="/search" className="hidden md:flex hover:text-gray-600 transition duration-150 ease-in-out">
            <SearchIcon className="w-6 h-6" />
          </Link>
          <Link to="/cart" className="hover:text-gray-600 transition duration-150 ease-in-out">
            <ShoppingCartIcon className="w-6 h-6" />
          </Link>
          <Link to="/user" className="hover:text-gray-600 transition duration-150 ease-in-out">
            <UserIcon className="w-6 h-6" />
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none">
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white bg-opacity-95 backdrop-blur-sm border-t py-4 flex flex-col items-center space-y-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-900 text-lg">Home</Link>
          <Link to="/bestsellers" onClick={() => setIsMenuOpen(false)} className="text-gray-900 text-lg">Mais Vendidos</Link>
          <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="text-gray-900 text-lg">Categorias</Link>
          <Link to="/search" onClick={() => setIsMenuOpen(false)} className="text-gray-900 text-lg flex items-center gap-1">
            <SearchIcon className="w-5 h-5" />
            Pesquisa
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
