import React, { useEffect, useState } from "react";
import axios from "axios";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) throw new Error("Usuário não encontrado no localStorage");

        const userId = JSON.parse(user).id;

        // Obtendo toda a wishlist do usuário
        const { data } = await axios.get(
          `http://localhost:4000/api/users/${userId}/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        
        setWishList(data); 
      } catch (err) {
        setError("Erro ao carregar a wishlist. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishList();
  }, []);

  return (
    <section className="bg-white py-12 antialiased md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Minha Lista de Desejos
        </h2>

        {loading && <p className="text-center text-gray-600">Carregando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && wishList.length === 0 && (
          <p className="text-center text-gray-600">Sua lista de desejos está vazia.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishList.map((product: any) => (
            <div
              key={product.id}
              className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm transition hover:shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-gray-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishList;
