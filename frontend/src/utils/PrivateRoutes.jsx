import {
    Outlet,
    Navigate
} from 'react-router-dom'

const PrivateRoutes = () => {
    const token = localStorage.getItem('auth_token');
    const isAuth = !!token;
    return (
        isAuth ?
            <Outlet /> :
            <Navigate to="/login" replace/>
    )
}

export default PrivateRoutes