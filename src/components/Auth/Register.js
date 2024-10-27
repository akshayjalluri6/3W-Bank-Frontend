import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Register.css'; // CSS file import

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const onSubmitSuccess = (data) => {
        Cookies.set('token', data.token, {
            expires: 1
        });
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData;

        try {
            const response = await axios.post("https://threew-bank-backend.onrender.com/register", {
                username,
                email,
                password
            });

            if (response.status === 200) {
                toast.success("Registration successful");
                onSubmitSuccess(response.data);
            }
        } catch (error) {
            toast.error("Registration failed, Please fill all the details");
            console.log(error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="form-container">
            <h1>Welcome to ThreeW</h1>
            <p>Create an account</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                />

                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                />

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Register;
