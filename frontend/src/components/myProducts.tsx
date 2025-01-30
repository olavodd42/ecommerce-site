import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  user_id: string;
  category: string;
  price: number;
  quantity: number;
  sales: number;
  freight: number;
  description: string;
  specs: Record<string, string>;
  image: string;
  // Add other necessary properties here
}

const MyProducts = () => {
    const [products, setProducts] = useState<Product[]>([]); // Apply the Product type
    const [error, setError] = useState<string | null>(null);
    const [isTabOpen, setIsTabOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userString = localStorage.getItem('user');
                if (!userString) {
                    throw new Error('Você precisa estar logado para acessar essa página');
                }
                const response = await axios.get<Product[]>('http://localhost:4000/api/products'); // Specify response type

                const user = JSON.parse(userString);
                const filteredProducts = response.data.filter((product) => product.user_id === user.id);
                setProducts(filteredProducts);
            } catch (error) {
                console.error(error);
                setError(error instanceof Error ? error.message : 'Erro desconhecido');
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div className="text-center pt-28 text-red-500">{error}</div>;
    }

    return (
        <div className="pt-28 w-full min-h-screen mx-auto px-4 bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-6">Lista de Produtos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <Link to={`/products/${product.id}/edit`}>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </Link>
                        </div>
                        <img 
                            src={`http://localhost:4000${product.image}`} 
                            alt={product.name} 
                            className="w-full h-48 object-cover"
                            onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")} 
                        />
                        <h2 className="text-xl font-bold mt-2">{product.name}</h2>
                        <p className="text-gray-600">{product.category}</p>
                        <p className="text-lg font-bold">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(product.price)}
                        </p>
                        <Link
                            to={`/products/${product.id}`}
                            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Ver Detalhes
                        </Link>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProducts;