import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState({ email: false, name: false, phone: false });
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (newPassword && newPassword !== confirmPassword) {
      setError("A nova senha e a confirmação não coincidem.");
      return;
    }

    try {
      setLoading(true);
      const payload: any = {
        email,
        name,
        phone,
      };

      if (currentPassword && newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      await axios.put(
        "http://localhost:4000/api/users/me",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      setSuccess(true);
    } catch (error: any) {
      console.error(error);
      setError(
        error.response?.data?.error || "Erro ao atualizar usuário. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = (field: string) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Atualizar Conta</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">Informações atualizadas com sucesso!</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditable.email}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isEditable.email ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
            <button
              type="button"
              onClick={() => toggleEdit("email")}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
            >
              {isEditable.email ? <FaCheck /> : <FaEdit />}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditable.name}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isEditable.name ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
            <button
              type="button"
              onClick={() => toggleEdit("name")}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
            >
              {isEditable.name ? <FaCheck /> : <FaEdit />}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditable.phone}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isEditable.phone ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
            <button
              type="button"
              onClick={() => toggleEdit("phone")}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
            >
              {isEditable.phone ? <FaCheck /> : <FaEdit />}
            </button>
          </div>

          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Senha Atual
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirme a Nova Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className={`w-full text-white py-3 rounded-lg transition duration-300 ${
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
