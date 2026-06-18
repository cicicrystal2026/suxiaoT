// src/lib/auth.js — 登录态管理（token 存 localStorage，前端解码读取身份）
import { postJSON } from './api';

const TOKEN_KEY = 'sx_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const logout = () => localStorage.removeItem(TOKEN_KEY);

// 从 token 里解出当前用户（不发网络请求；含 sub/role/name/exp）
export function currentUser() {
  const t = getToken();
  if (!t) return null;
  try {
    const json = atob(t.split('.')[0].replace(/-/g, '+').replace(/_/g, '/'));
    const u = JSON.parse(json);
    if (u.exp && u.exp < Math.floor(Date.now() / 1000)) { logout(); return null; }
    return u;
  } catch { return null; }
}

export const isAdmin = () => currentUser()?.role === 'admin';

// ---- 调用后端 ----
export async function adminLogin(username, password) {
  const { token, user } = await postJSON('/api/auth/admin/login', { username, password });
  setToken(token);
  return user;
}
export async function sendCode(phone) {
  return postJSON('/api/auth/send-code', { phone }); // { ok, devCode }
}
export async function memberLogin(phone, code, name) {
  const { token, user } = await postJSON('/api/auth/login', { phone, code, name });
  setToken(token);
  return user;
}
