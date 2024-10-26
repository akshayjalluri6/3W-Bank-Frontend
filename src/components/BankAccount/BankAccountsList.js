import { Link } from 'react-router-dom';
import './BankAccountsList.css';
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios';
import Cookies from 'js-cookie';


const BankAccountsList = ({ account }) => {

    const onDelete = async (id) => {
        try {
            const response = await axios.delete(`https://threew-bank-backend.onrender.com/delete-bank-details/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            if (response.status === 200) {
                window.location.href = '/'
            }
        } catch (error) {
            alert('Something went wrong, please try again')
            console.log(error)
        }
    }

    return (
        <div className="bank-accounts-list">
            <div className="bank-accounts-header">
                <h3>{account.bankName}</h3>
                <button onClick={() => onDelete(account._id)} className="delete-button">🗑️</button> {/* Using an emoji as the delete icon */}
            </div>
            <p>Branch: {account.branchName}</p>
            <p>IFSC Code: {account.ifscCode}</p>
            <p>Account Number: {account.accountNumber}</p>
            <p>Account Holder Name: {account.accountHolderName}</p>
            <div className='btn-edit-con'>
                <Link to={`/edit-bank-details/${account._id}`} className='button-edit'>
                    <AiFillEdit className='btn-edit' />
                </Link>
            </div>
        </div>
    );
};

export default BankAccountsList;