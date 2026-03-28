import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function loginAdmin({ email, password }) {
  // Replace with your real API call
  const response = await axios.post(`${API_BASE}/admin/login`, { email, password });
  return response.data; // expects { token, admin }
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_jwt');
}

export function setToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('admin_jwt', token);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('admin_jwt');
}

export function isAuthenticated() {
  return Boolean(getToken());
}
