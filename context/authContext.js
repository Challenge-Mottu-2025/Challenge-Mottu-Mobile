import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEYS = ['@users', 'users']; // tenta ambas as chaves por compatibilidade
const LOGGED_USER_KEY = '@loggedUser';

const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => false,
  logout: async () => {},
  register: async () => ({ success: false, message: '' })
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(LOGGED_USER_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        console.warn('Erro ao carregar usuário logado:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const _readUsersMap = async () => {
    try {
      for (const key of USERS_KEYS) {
        const raw = await AsyncStorage.getItem(key);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') return { map: parsed, key, mapFound: true };
          } catch {}
        }
      }
      return { map: {}, key: USERS_KEYS[0], mapFound: false }; // default key to save new users
    } catch (e) {
      console.warn('Erro ao ler usuários:', e);
      return { map: {}, key: USERS_KEYS[0], mapFound: false };
    }
  };

  const _saveUsersMap = async (map, key = USERS_KEYS[0]) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(map));
      return true;
    } catch (e) {
      console.warn('Erro ao salvar usuários:', e);
      return false;
    }
  };

  /**
   * login(cpfDigitsOrFormatted, senha) -> boolean
   * aceita cpf com ou sem formatação; compara senha em plaintext
   */
  const login = async (cpf, senha) => {
    try {
      const cpfDigits = (cpf || '').toString().replace(/\D/g, '');
      if (!cpfDigits) return false;

      // 1) tenta mapa de usuários (ex: '@users' ou 'users')
      const { map } = await _readUsersMap();
      const userRecordFromMap = map[cpfDigits];
      if (userRecordFromMap) {
        if (userRecordFromMap.senha === senha) {
          setUser(userRecordFromMap);
          try {
            await AsyncStorage.setItem(LOGGED_USER_KEY, JSON.stringify(userRecordFromMap));
          } catch (e) {
            console.warn('Erro ao salvar sessão local:', e);
          }
          return true;
        }
        return false;
      }

      // 2) fallback: tenta chave individual com o CPF (ex: AsyncStorage.getItem('12345678901'))
      try {
        const raw = await AsyncStorage.getItem(cpfDigits);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.senha === senha) {
              setUser(parsed);
              try {
                await AsyncStorage.setItem(LOGGED_USER_KEY, JSON.stringify(parsed));
              } catch (e) {
                console.warn('Erro ao salvar sessão local:', e);
              }
              return true;
            }
            return false;
          } catch (e) {
            // se não for JSON, não é um registro compatível
            return false;
          }
        }
      } catch (e) {
        console.warn('Erro ao tentar ler usuário por chave CPF:', e);
      }

      // não encontrou usuário
      return false;
    } catch (e) {
      console.warn('Erro no login:', e);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(LOGGED_USER_KEY);
    } catch (e) {
      console.warn('Erro ao limpar sessão:', e);
    }
  };

  /**
   * register({ cpf, nome, senha }) -> { success, message }
   * cpf pode vir formatado; será salvo com apenas dígitos como chave
   * Para compatibilidade, salva tanto como item individual (key = cpfDigits)
   * quanto no mapa '@users' (merge).
   */
  const register = async ({ cpf, nome, senha }) => {
    try {
      const cpfDigits = (cpf || '').toString().replace(/\D/g, '');
      if (!cpfDigits || cpfDigits.length !== 11) {
        return { success: false, message: 'CPF inválido' };
      }
      if (!nome || !senha) {
        return { success: false, message: 'Nome e senha são obrigatórios' };
      }

      // 1) verifica se já existe como chave individual
      try {
        const rawDirect = await AsyncStorage.getItem(cpfDigits);
        if (rawDirect) {
          return { success: false, message: 'CPF já cadastrado' };
        }
      } catch (e) {
        console.warn('Erro ao checar chave direta de usuário:', e);
      }

      // 2) verifica se existe no mapa
      const { map, key } = await _readUsersMap();
      if (map[cpfDigits]) {
        return { success: false, message: 'CPF já cadastrado' };
      }

      const newUser = {
        cpf: cpfDigits,
        nome: nome.trim(),
        senha
      };

      // Salva como item individual (compatibilidade com código que espera key = cpf)
      try {
        await AsyncStorage.setItem(cpfDigits, JSON.stringify(newUser));
      } catch (e) {
        console.warn('Erro ao salvar usuário por chave direta:', e);
      }

      // Atualiza o mapa também (merge)
      try {
        const updatedMap = { ...(map || {}) };
        updatedMap[cpfDigits] = newUser;
        await _saveUsersMap(updatedMap, key);
      } catch (e) {
        console.warn('Erro ao atualizar mapa de usuários:', e);
      }

      return { success: true, message: 'Usuário registrado' };
    } catch (e) {
      console.warn('Erro no registro:', e);
      return { success: false, message: 'Erro ao registrar usuário' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export default AuthContext;