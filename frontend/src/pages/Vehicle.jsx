import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


function Vehicle() {
    const { vehicleId } = useParams()
    const [vehicle, setVehicle] = useState({})

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/vehicles/${vehicleId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                setVehicle(response.data);
            } catch (error) {
                console.log('Vehicle fetch failed:', error);
            }
        }
        fetchVehicle()
    }, [vehicleId])
    return (
        <div className="mx-auto max-w-3xl">
            <div id="default-carousel" className="relative w-full">
                {/* Carousel wrapper */}
                <div className="relative w-full overflow-hidden rounded-lg border-2" style={{ paddingBottom: '75%' }}>
                    {/* Item 1 */}
                    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                        <img
                            src="/docs/images/carousel/carousel-1.svg"
                            className="absolute block w-full h-full object-cover"
                            alt="..."
                        />
                    </div>
                    {/* Item 2 */}
                    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                        <img
                            src="/docs/images/carousel/carousel-2.svg"
                            className="absolute block w-full h-full object-cover"
                            alt="..."
                        />
                    </div>
                    {/* Item 3 */}
                    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                        <img
                            src="/docs/images/carousel/carousel-3.svg"
                            className="absolute block w-full h-full object-cover"
                            alt="..."
                        />
                    </div>
                </div>
                {/* Slider indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="true"
                        aria-label="Slide 1"
                        data-carousel-slide-to={0}
                    />
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 2"
                        data-carousel-slide-to={1}
                    />
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 3"
                        data-carousel-slide-to={2}
                    />
                </div>
                {/* Slider controls */}
                <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev=""
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next=""
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
            <h1 className="flex items-center text-5xl font-extrabold text-white dark:text-white mt-3">
                {vehicle.brand}
                <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                    {vehicle.model}
                </span>
            </h1>
            <div className="flex justify-between">

                <div className="text-xl text-slate-300 mt-5 flex flex-col gap-3">
                    <h1>Type: {vehicle.type}</h1>
                    <h1>Year: {vehicle.year}</h1>
                    <h1>Price per Day: {vehicle.pricePerDay}Tk</h1>
                    <h1>Location: {vehicle.location}</h1>
                    <h1 className={`py-2 px-4 rounded-lg text-lg font-semibold ${vehicle.availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        Availability: {vehicle.availability ? 'Available' : 'Not Available'}
                    </h1>
                    <h1>Category: {vehicle.category}</h1>
                    <h1>Condition: {vehicle.condition}</h1>
                    <h1>Number Plate: {vehicle.no_plate}</h1>
                    <h1>Chassis Number: {vehicle.chassis_no}</h1>
                    <h1>Registration Number: {vehicle.registration_no}</h1>
                </div>
                <div>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-10 py-10 text-center me-2 mb-2"
                    >
                        Rent Now!
                    </button>

                </div>
            </div>

        </div>




    );

}

export default Vehicle
