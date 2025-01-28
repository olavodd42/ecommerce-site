import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState<number | null>(null);

  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos

  const startLogoutTimer = (timeout: number) => {
    if (logoutTimer) clearTimeout(logoutTimer);

    const timer = window.setTimeout(() => {
      logout();
    }, timeout);

    setLogoutTimer(timer);
  };
  
  // Verifica o token no início
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expiration = localStorage.getItem("authTokenExpiration");
  
    if (token && expiration) {
      const expirationTime = new Date(expiration).getTime();
      const currentTime = Date.now();
  
      if (currentTime < expirationTime && !isLoggedIn) { // Evita re-renderizações desnecessárias
        setIsLoggedIn(true);
        startLogoutTimer(expirationTime - currentTime);
      } else if (currentTime >= expirationTime) {
        logout();
      }
    }
  }, [isLoggedIn]); // Use `isLoggedIn` como dependência, evitando `logoutTimer`
  
  useEffect(() => {
    const resetTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      startLogoutTimer(INACTIVITY_TIMEOUT);
    };
  
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
  
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [logoutTimer, startLogoutTimer]);
  

  

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", { email, password });
      const { token, expiresIn } = response.data;

      if (!expiresIn || typeof expiresIn !== "number") {
        throw new Error("Token expirado ou valor inválido.");
      }

      const expirationTime = new Date(Date.now() + expiresIn * 1000).toISOString();

      // Armazena o token e a data de expiração no localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("authTokenExpiration", expirationTime);

      setIsLoggedIn(true);

      // Inicia o temporizador de logout
      startLogoutTimer(expiresIn * 1000);
      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response?.data?.error || "Erro ao fazer login. Tente novamente.");

    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    setIsLoggedIn(false);
    if (logoutTimer) clearTimeout(logoutTimer);
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
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
