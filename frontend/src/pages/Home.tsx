import React, { useEffect, useState } from "react";
import ProductCardCarousel from "../components/ProductCardCarousel.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/featured');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 flex flex-col items-center font-sans">
      {/* Hero Section */}
      <section className="w-full text-center py-24 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-5xl font-semibold tracking-tight">
          Descubra a Nova Era do Comércio
        </h1>
        <p className="text-lg font-light mt-4 max-w-xl text-gray-600">
          Tecnologia e inovação na ponta dos seus dedos.
        </p>
      </section>

      {/* Featured Products */}
      <section className="w-full max-w-6xl py-16 px-6 mt-10">
        <h5 className="text-4xl font-semibold text-gray-800 text-center mb-8">
          Produtos em Destaque
        </h5>
        {error ? (
          <p className="text-red-500 text-center">
            Erro ao carregar produtos: {error}
          </p>
        ) : (
          <ProductCardCarousel products={featuredProducts} />
        )}
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-4xl mt-16 p-10 bg-gray-50 rounded-xl shadow-sm text-center">
        <h3 className="text-3xl font-semibold text-gray-900">
          Fique por dentro das novidades
        </h3>
        <p className="text-gray-600 mt-3">
          Cadastre-se e receba ofertas exclusivas antes de todo mundo.
        </p>
        <button 
          className="mt-6 px-8 py-4 bg-gray-900 text-white rounded-lg text-lg font-medium hover:bg-gray-700 transition duration-300"
          onClick={() => navigate('/register')}
        >
          Cadastre-se Agora
        </button>
      </section>
    </div>
  );
};

export default Home;
