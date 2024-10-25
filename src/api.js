// src/api.js
import axios from 'axios';

const API_URL = 'https://threew-bank-backend.onrender.com';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const registerUser  = (data) => api.post('/register', data);
export const loginUser  = (data) => api.post('/login', data);
export const getBankDetails = () => api.get('/bank-details');
export const addBankDetails = (data) => api.post('/add-bank-details', data);
export const updateBankDetails = (id, data) => api.put(`/update-bank-details/${id}`, data);
export const deleteBankDetails = (id) => api.delete(`/delete-bank-details/${id}`);
export const getAllUsers = () => api.get('/admin');
export const getUserBankDetails = (id) => api.get(`/admin/${id}`);