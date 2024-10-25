// src/components/BankAccount/BankAccountsList.js
import React, { useState, useEffect } from 'react';
import { getBankDetails } from '../../api';

const BankAccountsList = () => {
    const [bankAccounts, setBankAccounts] = useState([]);

    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const response = await getBankDetails();
                setBankAccounts(response.data);
            } catch (error) {
                alert(error.response.data);
            }
        };
        fetchBankAccounts();
    }, []);

    return (
        <ul>
            {bankAccounts.map((bankAccount) => (
                <li key={bankAccount._id}>
                    <h3>{bankAccount.bankName}</h3>
                    <p>IFSC Code: {bankAccount.ifscCode}</p>
                    <p>Branch Name: {bankAccount.branchName}</p>
                    <p>Account Number: {bankAccount.accountNumber}</p>
                    <p>Account Holder Name: {bankAccount.accountHolderName}</p>
                </li>
            ))}
        </ul>
    );
};

export default BankAccountsList;