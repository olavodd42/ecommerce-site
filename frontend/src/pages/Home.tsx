import React, { useEffect, useState } from "react";
import ProductCardCarousel from "../components/ProductCardCarousel.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProduct] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products/featured');
      setFeaturedProduct(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="z-0 pt-28 w-full min-h-screen px-4 bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 text-center rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4">Bem-vindo à Nossa Loja</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">
          Descubra produtos incríveis com ofertas exclusivas e qualidade garantida!
        </p>
      </section>

      {/* Featured Products Section */}
      <section className="w-full max-w-6xl py-12 px-6 bg-white rounded-lg shadow-xl mt-10">
        <h5 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          Produtos em Destaque
        </h5>
        {error ? (
          <p className="text-red-500 text-center">Erro ao carregar produtos: {error}</p>
        ) : (
          <ProductCardCarousel products={featuredProducts} />
        )}
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-6xl mt-12 p-8 bg-blue-100 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-gray-800">Não perca nossas ofertas especiais!</h3>
        <p className="text-gray-600 mt-2">Cadastre-se para receber novidades e promoções exclusivas.</p>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300" onClick={()=>{navigate('/register')}}>
          Cadastre-se Agora
        </button>
      </section>
    </div>
  );
};

export default Home;
