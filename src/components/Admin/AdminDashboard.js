// src/components/Admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data);
            } catch (error) {
                alert(error.response.data);
            }
        };
        fetchUsers();
    }, []);

    return (
        <ul>
            {users.map((user) => (
                <li key={user._id}>
                    <h3>{user.username}</h3>
                    <p>Email: {user.email}</p>
                </li>
            ))}
        </ul>
    );
};

export default AdminDashboard;