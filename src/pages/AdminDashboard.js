import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('https://threew-bank-backend.onrender.com/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
