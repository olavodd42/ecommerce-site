import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const apiUrl = "http://localhost:4000";

interface AuthContextType {
  authenticate: (data: any) => Promise<any>;
  setLoggedUser: (data: any) => void;
  getLoggedUser: () => any;
  getToken: () => string | null;
  logout: () => void;
  user: any; // Adicionado estado do usuário
  isAuthenticated: boolean; // Adicionado verificação de autenticação
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      const userData = getLoggedUser();
      
      if (token && userData && !isTokenExpired()) {
        setIsAuthenticated(true);
        setUser(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        setIsAuthenticated(false);
        logout();
      }
    };
    checkAuth();
  }, []);

  // Verificar expiração do token
  const isTokenExpired = () => {
    const expiration = localStorage.getItem("authTokenExpiration");
    if (!expiration) return true;
    return new Date() > new Date(expiration);
  };

  // Função de autenticação
  const authenticate = async (data: any) => {
    return axios.post(`${apiUrl}/api/users/login`, data);
  };

  // Salvar dados do usuário e token
  const setLoggedUser = (data: any) => {
    const { token, expiresIn, user } = data;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiration', expirationDate.toString());
    localStorage.setItem('user', JSON.stringify(user));
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    setIsAuthenticated(true);
    

    // Configurar logout automático
     const time = setTimeout(() => {
       logout();
     }, expiresIn * 10000);
    console.log(`teste: ${expiresIn}`);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  // Obter token
  const getToken = () => localStorage.getItem("authToken");

  // Obter dados do usuário
  const getLoggedUser = () => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  };

  const value = {
    authenticate,
    setLoggedUser,
    getLoggedUser,
    getToken,
    logout,
    user,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}