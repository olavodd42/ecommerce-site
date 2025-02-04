import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



const ProductCarousel = ({products = []}) => {
  const navigate = useNavigate();
  const addToCart = async (productId, quantity) => {
    try {
      
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:4000/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: productId,
          quantity: quantity
        })
      });
  
      if (!response.ok) throw new Error('Erro ao adicionar ao carrinho');
      
      alert('Produto adicionado ao carrinho!');
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div className="w-screen mx-auto py-8 ">
      <h2 className="text-2xl font-bold text-center mb-6">Produtos em Destaque</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
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
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={`http://localhost:4000${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.price}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={()=> addToCart(product.id, 1)}>
                  Adicionar ao Carrinho
                </button>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={()=> navigate(`/products/${product.id}`)}>
                  Ver produto
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
