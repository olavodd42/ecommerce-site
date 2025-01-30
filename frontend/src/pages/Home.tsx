import React, { useEffect, useState } from "react";
import ProductCardCarousel from "../components/ProductCardCarousel.tsx";
import axios from "axios";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProduct] = useState([]);
  const fetchProducts = async ()=>{
    try {
      const response = await axios.get('http://localhost:4000/api/products/featured')
      setFeaturedProduct(response.data)
    } catch(error) {
      console.error(error);
      setError(error.message);
    }
  }
  useEffect(()=> {
    fetchProducts();
  }, []);

  return (
    <div className="z-0 pt-28 w-full min-h-screen px-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Home
      </h1>
      <div className="flex flex-col gap-12">
          <section className="py-12 px-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-xl">
            <h5 className="text-2xl font-semibold text-gray-700 mb-6">
              Em destaque
            </h5>
            <div>
              <ProductCardCarousel products={featuredProducts} />
            </div>
          </section>

        {/* Segunda Seção */}
        {/* <section className="py-12 px-6 bg-white rounded-lg shadow-xl">
          <h5 className="text-2xl font-semibold text-gray-700 mb-6">
            Top Vendas
          </h5>
          <div>
            <ProductCardCarousel products={} />
          </div>
        </section> */}

        {/* Terceira Seção */}
        {/* <section className="py-12 px-6 bg-gradient-to-r from-gray-100 to-blue-50 rounded-lg shadow-xl">
          <h5 className="text-2xl font-semibold text-gray-700 mb-6">
            Patrocinado
          </h5>
          <div>
            <ProductCardCarousel products={} />
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default Home;
