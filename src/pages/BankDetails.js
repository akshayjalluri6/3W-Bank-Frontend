import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BankDetails() {
  const [accounts, setAccounts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAccounts = async () => {
    const { data } = await axios.get('https://threew-bank-backend.onrender.com/bank-details', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAccounts(data);
  };

  useEffect(() => { fetchAccounts(); }, []);

  return (
    <div className="bank-details-container">
      <h2>Bank Accounts</h2>
      <ul>
        {accounts.map(account => (
          <li key={account._id}>
            {account.bankName} - {account.accountNumber}
            {/* Additional bank details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BankDetails;
