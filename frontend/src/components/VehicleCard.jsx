import { Link } from "react-router-dom"
import gt86 from '../assets/gt86.jpg' //dummy img


function VehicleCard({ vehicle }) {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/vehicles/${vehicle._id}`}>
                {vehicle.images && vehicle.images.length > 0 ? (
                    <img className="rounded-t-lg w-full h-48 object-cover" src={`http://localhost:3000/public/images/vehicle-images/${vehicle.images[0][0]}`} alt={`${vehicle.brand} ${vehicle.model}`} />
                ) : (
                    <img className="rounded-t-lg w-full h-48 object-cover" src={gt86} alt="Default vehicle" />
                )}
            </Link>
            <div className="p-5">
                <Link to={`/vehicles/${vehicle._id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
                        {vehicle.brand} {vehicle.model}
                    </h5>
                </Link>
                <p className="mb-1 text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Category:</span> {vehicle.category}
                </p>
                <p className="mb-1 text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Location:</span> {vehicle.location}
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Model Year:</span> {vehicle.year}
                </p>
                <div className="flex justify-between items-center">
                    <Link
                        to={`/vehicles/${vehicle._id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition"
                    >
                        Read More
                        <svg
                            className="rtl:rotate-180 w-4 h-4 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>
                    <span className="px-3 py-2 text-lg font-semibold text-gray-900 dark:text-white ml-6">
                        {vehicle.pricePerDay} Tk <span className="text-gray-500 dark:text-gray-400">/ day</span>
                    </span>

                </div>
            </div>
        </div>

    )
}

export default VehicleCard
