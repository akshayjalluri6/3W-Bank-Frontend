import Cookies from "js-cookie";
import AdminDashboard from "../Admin/AdminDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";

const Dashboard = () => {
    const isAdmin = Cookies.get('isAdmin') === 'true'

    return (
        <>
        {isAdmin ? (
            <AdminDashboard />
        ) : (
            <UserDashboard />
        )}
        </>
    )
}

export default Dashboard