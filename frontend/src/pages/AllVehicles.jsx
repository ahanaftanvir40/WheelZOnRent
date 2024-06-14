import axios from "axios"
import { VehicleCard } from "../components"
import { useState } from "react"


function AllVehicles() {

    const [vehicles, setVehicles] = useState([])
    const fetchVehicle = async () => {
        const response = await axios.get(`http://localhost:3000/api/allvehicles`)
        setVehicles(response.data)
    }
    fetchVehicle()
    return (
        <div className="flex gap-6 flex-wrap w-full">
            {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}

        </div>
    )
}

export default AllVehicles
