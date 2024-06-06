import { Route, Routes } from "react-router-dom"
import { Home, Login,SignUp } from "../pages"


function AllRoutes() {
    return (
        <div className="bg-gradient-to-r from-slate-800 to-orange-950 w-full min-h-screen">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>


        </div>
    )
}

export default AllRoutes
