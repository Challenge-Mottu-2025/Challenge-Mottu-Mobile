// utils/auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Remove tudo que não for dígito
 */
export function onlyDigits(str = '') {
  return (str || '').replace(/\D+/g, '');
}

/**
 * Formata CPF como 000.000.000-00
 */
export function formatCPF(value = '') {
  const digits = onlyDigits(value).slice(0, 11);
  if (!digits) return '';
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 9);
  const part4 = digits.slice(9, 11);
  let formatted = part1;
  if (part2) formatted += `.${part2}`;
  if (part3) formatted += `.${part3}`;
  if (part4) formatted += `-${part4}`;
  return formatted;
}

/**
 * Validação de CPF (algoritmo dos dígitos verificadores)
 */
export function isValidCPF(cpf = '') {
  const digits = onlyDigits(cpf);

  if (!digits || digits.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calc = (t) => {
    const nums = digits.substring(0, t).split('').map(Number);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) sum += nums[i] * ((t + 1) - i);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const d1 = calc(9);
  const d2 = calc(10);

  return d1 === Number(digits[9]) && d2 === Number(digits[10]);
}

/**
 * Pega todos os usuários (objeto map cpf -> user)
 */
export async function getAllUsers() {
  try {
    const raw = await AsyncStorage.getItem('users');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('Erro ao ler usuários:', e);
    return {};
  }
}

/**
 * Salva todo o mapa de usuários
 */
export async function saveAllUsers(users) {
  try {
    await AsyncStorage.setItem('users', JSON.stringify(users || {}));
    return true;
  } catch (e) {
    console.warn('Erro ao salvar usuários:', e);
    return false;
  }
}

/**
 * Registra um usuário localmente.
 * user = { cpf, nome, senha } - cpf pode estar formatado ou não
 * Retorna { success: boolean, message: string }
 */
export async function registerUser({ cpf, nome, senha }) {
  const cpfDigits = onlyDigits(cpf);
  if (!cpfDigits || cpfDigits.length !== 11) {
    return { success: false, message: 'CPF inválido.' };
  }
  if (!isValidCPF(cpfDigits)) {
    return { success: false, message: 'CPF inválido (checar dígitos).' };
  }
  if (!nome || !senha) {
    return { success: false, message: 'Nome e senha são obrigatórios.' };
  }
  const users = await getAllUsers();
  if (users[cpfDigits]) {
    return { success: false, message: 'CPF já cadastrado.' };
  }

  // Observação: aqui a senha fica armazenada localmente (plaintext).
  // Para produção, usar hashing + backend.
  users[cpfDigits] = {
    cpf: cpfDigits,
    nome: nome.trim(),
    senha
  };

  const ok = await saveAllUsers(users);
  if (!ok) return { success: false, message: 'Erro ao salvar usuário.' };
  return { success: true, message: 'Registro concluído.' };
}

/**
 * Tenta logar usuário localmente
 * Retorna { success: boolean, message: string, user?: object }
 */
export async function loginUser({ cpf, senha }) {
  const cpfDigits = onlyDigits(cpf);
  if (!cpfDigits || cpfDigits.length !== 11) {
    return { success: false, message: 'CPF inválido.' };
  }
  const users = await getAllUsers();
  const user = users[cpfDigits];
  if (!user) {
    return { success: false, message: 'Usuário não encontrado.' };
  }
  if (user.senha !== senha) {
    return { success: false, message: 'Senha incorreta.' };
  }
  return { success: true, message: 'Login bem sucedido.', user };
}