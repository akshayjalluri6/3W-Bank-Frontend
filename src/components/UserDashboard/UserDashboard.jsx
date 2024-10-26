import { useState, useEffect } from 'react';
import './UserDashboard.css'
import Cookies from 'js-cookie'
import axios from 'axios';
import { Link } from 'react-router-dom';
import BankAccountsList from '../BankAccount/BankAccountsList';

const UserDashboard = () => {
    const [bankAccountDetails, setBankAccountDetails] = useState()
    const username = Cookies.get('username') || ''; 
    const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

    useEffect(() => {
        const token = Cookies.get('token')
        const getUserBankDetails = async () => {
            try {
                const response = await axios.get('https://threew-bank-backend.onrender.com/bank-details', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setBankAccountDetails(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getUserBankDetails()
    }, [])

    const onLogout = () => {
        Cookies.remove('token')
        Cookies.remove('isAdmin')
        Cookies.remove('username')
        Cookies.remove('user_id')
        window.location.href = '/'
    }

    return(
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Welcome, {formattedUsername}</h1>
            <p className="bank-accounts-section">Your Bank Accounts</p>
            <button onClick={onLogout} >Logout</button>
            <Link className="add-bank-link" to="/add-bank-account">Add New Bank</Link>
            <ul className="bank-accounts-list">
                {bankAccountDetails && bankAccountDetails.map((account) => (
                    <li key={account._id} className="bank-account-item">
                        <BankAccountsList account={account} />
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default UserDashboard;
