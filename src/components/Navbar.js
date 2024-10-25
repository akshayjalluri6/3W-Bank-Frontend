// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAdmin, onLogout }) => {
    return (
        <nav>
            <Link to="/">Home</Link>
            {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
            <Link to="/bank-accounts">Bank Accounts</Link>
            <Link to="/login" onClick={onLogout}>Logout</Link>
        </nav>
    );
};

export default Navbar;