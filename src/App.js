import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import AddBankAccount from './components/BankAccount/AddBankAccount';
import './App.css'
import EditBankAccount from './components/BankAccount/EditBankAccount';
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route exact path="/add-bank-account" element={<ProtectedRoute element={<AddBankAccount />} />} />
                <Route exact path='/edit-bank-details/:id' element={<ProtectedRoute element={<EditBankAccount />} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;