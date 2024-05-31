import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const register = (userData) => axios.post(`${API_URL}/users/register`, userData);
const login = (credentials) => axios.post(`${API_URL}/users/login`, credentials);
const fetchProducts = (token) => axios.get(`${API_URL}/products`, { headers: { Authorization:token } });
const createProduct = (productData, token) => axios.post(`${API_URL}/products`, productData, { headers: { Authorization:token } });
const updateProduct = (id, productData, token) => axios.put(`${API_URL}/products/${id}`, productData, { headers: { Authorization: token } });
const deleteProduct = (id, token) => axios.delete(`${API_URL}/products/${id}`, { headers: { Authorization:token } });

export {
    register,
    login,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
