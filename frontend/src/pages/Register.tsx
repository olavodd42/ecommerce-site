import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const [success, setSuccess] = useState(false); // Estado para sucesso
  const [showPassword, setShowPassword] = React.useState(false) // Estado para mostrar/esconder senha
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; // Exemplo: (55) 55555-5555
    return phoneRegex.test(phone);
  };

  useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        navigate("/user"); // Redireciona para a página do usuário se estiver autenticado
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    setError(null); // Limpa erros anteriores
    setSuccess(false); // Limpa estado de sucesso

    // Validação no front-end
    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    if (!validatePhone(tel)) {
      setError("Por favor, insira um número de telefone válido no formato (55) 55555-5555.");
      return;
    }

    try {
      setLoading(true); // Indica carregamento
      await axios.post("http://localhost:4000/api/users/register", {
        email,
        name,
        phone: tel, // Corrigido para "phone"
        password,
      });

      // Limpa os campos após o registro
      setEmail("");
      setName("");
      setTel("");
      setPassword("");
      setSuccess(true); // Indica sucesso
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error || "Erro ao registrar usuário. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Novo por aqui?
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Registre-se para criar uma conta
        </p>

        {/* Mensagem de erro */}
        {error && <p className="text-sm text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-sm text-green-500 text-center mb-4">
            Usuário registrado com sucesso!
          </p>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              type="text"
              placeholder="Digite seu e-mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tel"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Telefone
            </label>
            <input
              type="text"
              placeholder="Digite seu número de telefone"
              name="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          <div className="mb-4">
          <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              type={showPassword ? "text" : "password"} // Alternar entre texto e senha
              placeholder="Digite sua senha"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Alternar visibilidade da senha
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícone para mostrar/ocultar senha */}
            </button>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-lg transition duration-300 ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Registrar"}
            </button>
          </div>
        </form>

        {/* Links de Ação */}
        <div className="text-sm text-center">
          <p className="mb-2">
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
