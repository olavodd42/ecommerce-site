import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:4000/api/products/search', {
        params: { query, category },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 shadow-sm rounded-lg">
      <form onSubmit={handleSearch} className="flex relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="z-10 inline-flex items-center py-2.5 px-4 bg-gray-100 border border-gray-200 rounded-l-lg hover:bg-gray-200 focus:outline-none"
        >
          {category || "Todas as categorias"}
          <svg className="w-2.5 h-2.5 ml-2" viewBox="0 0 10 6">
            <path d="m1 1 4 4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 mt-12 bg-white border border-gray-200 rounded-lg shadow w-44 z-20">
            <ul className="py-2 text-sm text-gray-700">
              {["Mockups", "Templates", "Design", "Logos"].map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => { setCategory(cat); setIsDropdownOpen(false); }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2.5 w-full border border-gray-200 rounded-r-lg focus:outline-none focus:ring focus:ring-gray-200"
          placeholder="Buscar produtos..."
        />
        <button type="submit" className="p-2.5 bg-gray-900 text-white rounded-r-lg hover:bg-gray-800 focus:outline-none">
          🔍
        </button>
      </form>

      {/* Resultados da Pesquisa */}
      <div className="mt-6">
        {products.length > 0 ? (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.id} className="p-4 bg-white rounded-lg shadow-sm flex items-center space-x-4">
                <img src={`http://localhost:4000${product.image}`} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <Link to={`/products/${product.id}`} className="text-lg font-semibold text-gray-900 hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-gray-700 font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
