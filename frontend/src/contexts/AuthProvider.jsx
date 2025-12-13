import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import AuthService from '../services/auth.service';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = AuthService.getToken();
    const storedUser = AuthService.getCurrentUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await AuthService.login(credentials);
    setUser(data.user);
    setToken(data.accessToken);
  };

  const register = async (name, email, password) => {
    const data = await AuthService.register({ name, email, password });
    setUser(data.user);
    setToken(data.accessToken);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = () => {
    return token ? true : false;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
