import { Route, Routes } from "react-router-dom"
import { AddVehicles, AdminDashboard, AllVehicles, EditProfile, Home, Login, SignUp, UserProfile, Vehicle } from "../pages"
import PrivateRoutes from "../utils/PrivateRoutes"




function AllRoutes() {
    return (
        <div className="w-full min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route element={<PrivateRoutes />}>
                    <Route path="/profile" element={<UserProfile />}></Route>
                    <Route path="/editprofile" element={<EditProfile />}></Route>
                    <Route path="/addvehicles" element={<AddVehicles />}></Route>
                    <Route path="/vehicles/:vehicleId" element={<Vehicle />}></Route>
                    <Route path="/vehicles" element={<AllVehicles />}></Route>
                </Route>

                <Route path="/admin" element={<AdminDashboard />}></Route>









            </Routes>


        </div>
    )
}

export default AllRoutes
