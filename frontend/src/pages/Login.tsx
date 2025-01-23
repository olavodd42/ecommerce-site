import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bem-vindo de Volta!
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Faça login para acessar sua conta
        </p>

        {/* Formulário */}
        <form>
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
              type="password"
              placeholder="Digite sua senha"
              name="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Entrar
            </button>
          </div>
        </form>

        {/* Links de Ação */}
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
