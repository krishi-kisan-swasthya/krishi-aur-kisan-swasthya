// Backend API Configuration
// Directly connected to your live Render backend
export const API_BASE_URL = 'https://krishi-aur-kisan-swasthya.onrender.com';

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
