import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user"); // Redireciona para a página inicial se estiver autenticado
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/api/users/login", {
        email,
        password,
      });

      const { token } = response.data;

      // Salva o token no localStorage
      localStorage.setItem("authToken", token);

      // Redireciona para a home
      navigate("/");

      // Limpa os campos
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Erro ao logar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bem-vindo de Volta!
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Faça login para acessar sua conta
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p className="mb-2">
            Não tem uma conta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Registre-se
            </a>
          </p>
          <p>
            Esqueceu sua senha?{" "}
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Recuperar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
