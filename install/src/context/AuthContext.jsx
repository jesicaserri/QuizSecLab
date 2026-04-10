import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("quiz_token");
    const savedUser = localStorage.getItem("quiz_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { token: t, user: u } = res.data;
    localStorage.setItem("quiz_token", t);
    localStorage.setItem("quiz_user", JSON.stringify(u));
    setToken(t);
    setUser(u);
    return res.data;
  };

  const register = async (username, email, password) => {
    const res = await API.post("/auth/register", { username, email, password });
    const { token: t, user: u } = res.data;
    localStorage.setItem("quiz_token", t);
    localStorage.setItem("quiz_user", JSON.stringify(u));
    setToken(t);
    setUser(u);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("quiz_token");
    localStorage.removeItem("quiz_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
