import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response?.data?.error || "Erro ao fazer login. Tente novamente.");
    }
  };

  const logout = () => {
    console.log("Logout iniciado");
    localStorage.removeItem("authToken");
    console.log("Token após remoção:", localStorage.getItem("authToken")); // Deve ser null
    setIsLoggedIn(false);
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
// Configure o Axios para adicionar o token automaticamente
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Obtém o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho Authorization
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
