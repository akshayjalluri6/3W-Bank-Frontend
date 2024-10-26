import { useState } from 'react'
import './EditBankAccount.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EditBankAccount = () => {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        ifscCode: '',
        branchName: '',
        bankName: '',
        accountNumber: '',
        accountHolderName: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();

        try {
            const user_id = Cookies.get('user_id')
            const {ifscCode, branchName, bankName, accountNumber, accountHolderName} = formData
            const response = await axios.put(`https://threew-bank-backend.onrender.com/update-bank-details/${id}`, {
                user_id,
                ifscCode,
                branchName,
                bankName,
                accountNumber,
                accountHolderName
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
            if (response.status === 200){
                window.location.href = '/'
            }
            else{
                alert('Something went wrong, please try again')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="add-bank-account-container">
        <form onSubmit={handleSubmit} className="add-bank-account-form">
            <h2 className="form-title">Edit Your Bank Account</h2>
            <input type="text" name="ifscCode" placeholder="IFSC Code" onChange={handleChange} className="form-input"/>
            <input type="text" name="branchName" placeholder="Branch Name" onChange={handleChange}  className="form-input"/>
            <input type="text" name="bankName" placeholder="Bank Name" onChange={handleChange} className="form-input"/>
            <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleChange} className="form-input"/>
            <input type="text" name="accountHolderName" placeholder="Account Holder Name" onChange={handleChange} className="form-input"/>
            <button type="submit" className="submit-button">Save</button>
        </form>
    </div>
    )
}

export default EditBankAccount