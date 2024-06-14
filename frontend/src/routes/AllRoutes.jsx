import { Route, Routes } from "react-router-dom"
import { AddVehicles, AdminDashboard, AllVehicles, Home, Login, SignUp, UserProfile, Vehicle } from "../pages"


function AllRoutes() {
    return (
        <div className="w-full min-h-screen p-20">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/admin" element={<AdminDashboard />}></Route>
                <Route path="/profile" element={<UserProfile />}></Route>
                <Route path="/addvehicles" element={<AddVehicles />}></Route>
                <Route path="/vehicles/:vehicleId" element={<Vehicle />}></Route>
                <Route path="/vehicles" element={<AllVehicles />}></Route>
            </Routes>


        </div>
    )
}

export default AllRoutes
