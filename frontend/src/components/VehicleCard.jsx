import { Link } from "react-router-dom"
import gt86 from '../assets/gt86.jpg' //dummy img


function VehicleCard({ vehicle }) {
    return (
        <div>
            <div className="max-w-sm bg-slate-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/vehicles/${vehicle._id}`}>
                    <img className="rounded-t-lg" src={gt86} alt="" />
                </Link>
                <div className="p-5">
                    <Link to={`/vehicles/${vehicle._id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {vehicle.brand} {vehicle.model}
                        </h5>
                    </Link>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                        Category: {vehicle.category}
                    </p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                        Location: {vehicle.location}


                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Model Year: {vehicle.year}
                    </p>
                    <div className="flex justify-between">
                        <Link
                            to={`/vehicles/${vehicle._id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Read More
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                        <h1 className="px-3 py-2 rounded-md bg-green-700 text-white text-sm font-medium">Per Day: {vehicle.pricePerDay}Tk</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default VehicleCard
