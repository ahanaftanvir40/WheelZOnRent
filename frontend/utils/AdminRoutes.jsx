import { Outlet, Navigate } from "react-router-dom"



function AdminRoutes() {

    return (
        localStorage.getItem('isAdmin') === 'true' ? <Outlet /> : <Navigate to='/' />
    )
}

export default AdminRoutes
