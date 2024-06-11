import { Route, Routes } from "react-router-dom"
import { AddVehicles, AdminDashboard, Home, Login, SignUp, UserProfile } from "../pages"


function AllRoutes() {
    return (
        <div className="bg-gradient-to-r from-slate-800 to-orange-950 w-full min-h-screen p-20">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/admin" element={<AdminDashboard />}></Route>
                <Route path="/profile" element={<UserProfile />}></Route>
                <Route path="/addvehicles" element={<AddVehicles />}></Route>
            </Routes>


        </div>
    )
}

export default AllRoutes
