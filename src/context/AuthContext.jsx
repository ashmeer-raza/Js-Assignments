import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('interview-tracker-user', null);

  const login = (userData) => {
    setUser({
      name: userData.name || 'Alex Chen',
      title: userData.title || 'CS Student \'26',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'Alex Chen')}&background=e0e7ff&color=4338ca`
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
