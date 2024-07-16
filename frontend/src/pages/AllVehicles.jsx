import axios from "axios"
import { VehicleCard } from "../components"
import { useEffect, useState } from "react"


function AllVehicles() {

    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')


    const fetchVehicles = async (query = '') => {
        setLoading(true)
        const response = await axios.get(`http://localhost:3000/api/allvehicles`, {
            params: { search: query }
        })
        setVehicles(response.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchVehicles()
    }, [])

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchVehicles(search)
    }

    if (loading) {
        return (
            <div className="flex flex-col gap-4 w-52">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        )
    }
    return (
        <div className="mt-5 p-4">
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto ">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Vehicles"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="gap-1 mt-10 mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Available Vehicles</h2>
            <p className="text-semibold text-slate-500">Browse our selection of vehicles for rent.</p>
          </div>

            <div className="flex gap-8 flex-wrap w-full ">
                {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}

            </div>
        </div>
    )
}

export default AllVehicles
