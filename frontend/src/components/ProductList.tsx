import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                setProducts(response.data);
                console.log(products);
            } catch (error) {
                console.error(error);
                setError(error.message);
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
                    <div key={product.id || product._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={`http://localhost:4000${product.image}`} alt={product.name} onError={(e) => e.target.src = "/fallback-image.jpg"} />
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-gray-600">{product.category}</p>
                        <p className="text-lg font-bold">R$ {product.price}</p>
                        <Link
                            to={`/products/${product.id || product._id}`}
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

export default ProductList;