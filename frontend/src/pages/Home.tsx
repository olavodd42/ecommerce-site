import React from "react";
import ProductCardCarousel from "../components/ProductCardCarousel.tsx";

const Home: React.FC = () => {
  const products1 = [
    {
      id: 1,
      name: "Produto 1",
      price: "R$ 100,00",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Produto 2",
      price: "R$ 200,00",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Produto 3",
      price: "R$ 300,00",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="z-0 pt-28 w-full min-h-screen px-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Home
      </h1>
      <div className="flex flex-col gap-12">
        {/* Primeira Seção */}
        <section className="py-12 px-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-xl">
          <h5 className="text-2xl font-semibold text-gray-700 mb-6">
            Escolhas feitas para você
          </h5>
          <div>
            <ProductCardCarousel products={products1} />
          </div>
        </section>

        {/* Segunda Seção */}
        <section className="py-12 px-6 bg-white rounded-lg shadow-xl">
          <h5 className="text-2xl font-semibold text-gray-700 mb-6">
            Top Vendas
          </h5>
          <div>
            <ProductCardCarousel products={products1} />
          </div>
        </section>

        {/* Terceira Seção */}
        <section className="py-12 px-6 bg-gradient-to-r from-gray-100 to-blue-50 rounded-lg shadow-xl">
          <h5 className="text-2xl font-semibold text-gray-700 mb-6">
            Patrocinado
          </h5>
          <div>
            <ProductCardCarousel products={products1} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
