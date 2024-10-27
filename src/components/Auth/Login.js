import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const onSubmitSuccess = (data) => {
        Cookies.set('token', data.token, {
            expires: 1
        });
        Cookies.set('isAdmin', data.user.isAdmin, {
            expires: 1
        })
        Cookies.set('username', data.user.username, {
            expires: 1
        })
        Cookies.set('user_id', data.user._id, {
            expires: 1
        })
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const response = await axios.post("https://threew-bank-backend.onrender.com/login", {
                email,
                password
            });

            if (response.status === 200) {
                onSubmitSuccess(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) navigate('/');
    }, [navigate]);

    return (
        <div className="bg-login-container">
            <div className="login-form-container">
                <h1 className="wavehand">👋</h1>
                <h2 className="login-heading">Welcome to ThreeW</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            required
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                        <label>
                            <span>Email</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            required
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                        <label>
                            <span>Password</span>
                        </label>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="login-text">Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    );
};

export default Login;