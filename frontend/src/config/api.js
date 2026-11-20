// Backend API Configuration
// In local dev, defaults to '' (proxied by Vite to http://localhost:5000)
// In production on Vercel: set VITE_API_BASE_URL to your Render backend URL (e.g. https://krishiaurkishan-backend.onrender.com)
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
