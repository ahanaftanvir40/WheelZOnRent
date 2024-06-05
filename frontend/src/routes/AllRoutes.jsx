import { Route, Routes } from "react-router-dom"
import { Home } from "../pages"

function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </div>
    )
}

export default AllRoutes
