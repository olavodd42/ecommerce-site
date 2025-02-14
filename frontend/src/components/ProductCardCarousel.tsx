import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = ({ products = [] }) => {
  const navigate = useNavigate();
  
  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:4000/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) throw new Error("Erro ao adicionar ao carrinho");
      alert("Produto adicionado ao carrinho!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Produtos em Destaque</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={`http://localhost:4000${product.image}`}
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm">R$ {product.price.toFixed(2)}</p>
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition"
                    onClick={() => addToCart(product.id, 1)}
                  >
                    Adicionar ao Carrinho
                  </button>
                  <button
                    className="w-full py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Ver Produto
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
