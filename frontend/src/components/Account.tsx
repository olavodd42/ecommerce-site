import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const Account = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [hashedPassword, setHashedPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState({ email: false, name: false, phone: false });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; // Exemplo: (55) 55555-5555
        return phoneRegex.test(phone);
    };

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error("Token não encontrado no localStorage.");
                return;
            }
            const response = await axios.get('http://localhost:4000/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            setEmail(data.email);
            setName(data.name);
            setPhone(data.phone);
            setHashedPassword(data.password);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!validateEmail(email)) {
            setError("Por favor, insira um e-mail válido.");
            return;
        }

        if (!validatePhone(phone)) {
            setError("Por favor, insira um número de telefone válido no formato (55) 55555-5555.");
            return;
        }

        try {
            setLoading(true);
            await axios.put(
                "http://localhost:4000/api/users/me",
                {
                  email,
                  name,
                  phone,
                  password: hashedPassword, // Envia como "password" e não "hashedPassword"
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                  },
                }
              );
              

            setSuccess(true);
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.error || "Erro ao atualizar usuário. Tente novamente mais tarde."
            );
        } finally {
            setLoading(false);
        }
    };

    const toggleEdit = (field) => {
        setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Atualizar Conta</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">Informações atualizadas com sucesso!</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditable.email}
                            className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                isEditable.email ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => toggleEdit("email")}
                            className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                        >
                            {isEditable.email ? <FaCheck /> : <FaEdit />}
                        </button>
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditable.name}
                            className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                isEditable.name ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => toggleEdit("name")}
                            className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                        >
                            {isEditable.name ? <FaCheck /> : <FaEdit />}
                        </button>
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Telefone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditable.phone}
                            className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                                isEditable.phone ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => toggleEdit("phone")}
                            className="absolute top-8 right-2 text-blue-500 hover:text-blue-700"
                        >
                            {isEditable.phone ? <FaCheck /> : <FaEdit />}
                        </button>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full text-white py-2 rounded-lg transition duration-300 ${
                                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;
