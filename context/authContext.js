import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { saveToken, getToken, clearToken } from '../services/authStorage';

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await getToken();
        if (stored) {
          setToken(stored);
          api.defaults.headers.Authorization = `Bearer ${stored}`;
          try {
            const payload = JSON.parse(atob(stored.split('.')[1]));
            setUser({ cpf: payload.sub, nome: payload.nome });
          } catch {
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (cpf, senha) => {
    try {
      const res = await api.post('/auth/login', { cpf, senha });
      const { token: tk, cpf: cpfRes, nome } = res.data;
      setToken(tk);
      setUser({ cpf: cpfRes, nome });
      api.defaults.headers.Authorization = `Bearer ${tk}`;
      await saveToken(tk);
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async ({ cpf, nome, senha, dataNascimento, nrCep }) => {
    try {
      const res = await api.post('/auth/register', {
        cpf,
        nome,
        senha,
        dataNascimento: dataNascimento || null,
        nrCep: nrCep || null
      });
      const { token: tk, cpf: cpfRes, nome: nomeRes } = res.data;
      setToken(tk);
      setUser({ cpf: cpfRes, nome: nomeRes });
      api.defaults.headers.Authorization = `Bearer ${tk}`;
      await saveToken(tk);
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    delete api.defaults.headers.Authorization;
    await clearToken();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}