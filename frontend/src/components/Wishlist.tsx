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
        const { data } = await axios.get(`http://localhost:4000/api/users/${userId}/wishlist`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
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
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Minha Lista de Desejos
        </h2>

        {loading && <p className="text-gray-600 dark:text-gray-400">Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && wishList.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">Sua lista de desejos está vazia.</p>
        )}

        <ul className="space-y-4">
          {wishList.map((product: any) => (
            <li key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg dark:border-gray-700">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">R$ {product.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WishList;
