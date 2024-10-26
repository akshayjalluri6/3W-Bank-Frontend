import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({element: Component}) => {
    const token = Cookies.get('token');

    if(token === undefined) {
        return <Navigate to="/login" />
    }

    return Component
}

export default ProtectedRoute