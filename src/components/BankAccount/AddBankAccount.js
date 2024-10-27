import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './AddBankAccount.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBankAccount = () => {
    const [formData, setFormData] = useState({
        ifscCode: '',
        branchName: '',
        bankName: '',
        accountNumber: '',
        accountHolderName: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user_id = Cookies.get('user_id');
            const token = Cookies.get('token');
            const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = formData;
            const response = await axios.post("https://threew-bank-backend.onrender.com/add-bank-details", {
                user_id,
                ifscCode,
                branchName,
                bankName,
                accountNumber,
                accountHolderName
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
            toast.success('Bank details added successfully')
            setTimeout(() => {
                navigate('/')
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong, please try again')
        }
    };

    return (
        <div className="add-bank-account-container">
            <form onSubmit={handleSubmit} className="add-bank-account-form">
                <h2 className="form-title">Add New Bank Account</h2>
                <input type="text" name="ifscCode" placeholder="IFSC Code" onChange={handleChange} required className="form-input"/>
                <input type="text" name="branchName" placeholder="Branch Name" onChange={handleChange} required className="form-input"/>
                <input type="text" name="bankName" placeholder="Bank Name" onChange={handleChange} required className="form-input"/>
                <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleChange} required className="form-input"/>
                <input type="text" name="accountHolderName" placeholder="Account Holder Name" onChange={handleChange} required className="form-input"/>
                <button type="submit" className="submit-button">Add Bank Account</button>
            </form>
        </div>
    );
};

export default AddBankAccount;
