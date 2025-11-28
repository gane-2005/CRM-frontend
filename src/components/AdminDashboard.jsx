import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8083/api/admin/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(response.data);
        } catch (err) {
            setError('Access Denied: You do not have admin privileges.');
        }
    };

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AdminDashboard;
