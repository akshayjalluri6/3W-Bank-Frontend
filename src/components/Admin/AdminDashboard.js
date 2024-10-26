import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const fetchBankAccounts = async () => {
            const token = Cookies.get('token'); // Get the token from local storage
            
            try {
                const response = await axios.get("https://threew-bank-backend.onrender.com/admin", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to headers
                    },
                });
                setUsers(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : "Error fetching bank accounts");
            }
        };

        fetchBankAccounts();
    }, []);

    return (
        <div className='admin-users-container'>
            {error && <p>{error}</p>} {/* Display error if there is one */}
            <h1>Admin Dashboard</h1>
            <p>List of registered users:</p>
            <ul className='list-container'>
                {users.map((user) => (
                    <Link to={`/admin/${user._id}`} key={user._id}>
                        <li className='list'>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
