// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import BankAccountsList from './components/BankAccount/BankAccountsList';
import AddBankAccount from './components/BankAccount/AddBankAccount';
import EditBankAccount from './components/BankAccount/EditBankAccount';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserBankAccounts from './components/Admin/UserBankAccounts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Implement authentication check logic here
            // Set isAuthenticated and isAdmin based on your authentication logic
        };
        checkAuth();
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <BrowserRouter>
            <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/bank-accounts" element={<ProtectedRoute component={BankAccountsList} isAuthenticated={isAuthenticated} />} />
                <Route path="/add-bank-account" element={<ProtectedRoute component={AddBankAccount} isAuthenticated={isAuthenticated} />} />
                <Route path="/edit-bank-account/:id" element={<ProtectedRoute component={EditBankAccount} isAuthenticated={isAuthenticated} />} />
                <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />} />
                <Route path="/admin/:id" element={<ProtectedRoute component={UserBankAccounts} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;