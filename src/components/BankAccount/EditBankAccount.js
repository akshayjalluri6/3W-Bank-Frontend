// src/components/BankAccount/EditBankAccount.js
import React, { useState } from 'react';
import { updateBankDetails } from '../../api';

const EditBankAccount = ({ match }) => {
    const [formData, setFormData] = useState({
        ifscCode: '',
        branchName: '',
        bankName: '',
        accountNumber: '',
        accountHolderName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBankDetails(match.params.id, formData);
            alert('Bank account updated successfully!');
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="ifscCode" placeholder="IFSC Code" onChange={handleChange} required />
            <input type="text" name="branchName" placeholder="Branch Name" onChange={handleChange} required />
            <input type="text" name="bankName" placeholder="Bank Name" onChange={handleChange} required />
 <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleChange} required />
            <input type="text" name="accountHolderName" placeholder="Account Holder Name" onChange={handleChange} required />
            <button type="submit">Update Bank Account</button>
        </form>
    );
};

export default EditBankAccount;