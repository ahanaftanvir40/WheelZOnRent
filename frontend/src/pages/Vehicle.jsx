import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import gt86 from '../assets/gt86.jpg' //dummy



function Vehicle() {
    const { vehicleId } = useParams()
    const [vehicle, setVehicle] = useState({})
    console.log('vehicle id from params:', vehicleId);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/vehicles/${vehicleId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                setVehicle(response.data);
                console.log(response.data);
            } catch (error) {
                console.log('Vehicle fetch failed:', error);
            }
        }
        fetchVehicle()
    }, [vehicleId])
    return (
        <div className="mx-auto max-w-3xl">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <img src={gt86} alt="Vehicle 1" className="w-full h-full object-cover rounded-sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gt86} alt="Vehicle 2" className="w-full h-full object-cover rounded-sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/docs/images/carousel/carousel-3.svg" alt="Vehicle 3" className="w-full h-full object-cover rounded-sm" />
                </SwiperSlide>
            </Swiper>

            <div className="flex justify-between">
                <div>
                    <h1 className="flex items-center text-5xl font-extrabold text-white dark:text-white mt-3">
                        {vehicle.brand}
                        <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                            {vehicle.model}
                        </span>
                    </h1>
                </div>
                <h1 className={`py-2 px-4 rounded-lg text-lg font-semibold mt-3 ${vehicle.availability ? 'bg-gradient-to-r from-teal-200 to-lime-200 text-slate-600' : 'bg-red-500 text-white'}`}>
                    {vehicle.availability ? 'Available' : 'Not Available'}
                </h1>
            </div>
            <div className="mt-2 sm:mt-4 flex justify-between gap-4">
                <div>
                    <h1 className="font-medium text-lg text-slate-200">About the Car:</h1>
                    <p className="text-gray-200 dark:text-gray-400">{vehicle.description}</p>
                </div>

                <div className="">
                    <button
                        type="button"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2 text-center mb-2"
                    >
                        Rent Now!
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-2 text-xl text-slate-300 mt-5">
                <span className="bg-gradient-to-br from-purple-600 to-blue-500  p-1 text-md tracking-tighter text-slate-200 w-fit rounded-md">Owner Name : {vehicle.ownerId && vehicle.ownerId.name}</span>
                <span>Type: {vehicle.type}</span>
                <span>Year: {vehicle.year}</span>
                <span className="p-2 bg-gradient-to-br from-purple-600 to-blue-500 rounded-md w-fit font-medium text-slate-200">Price per Day: {vehicle.pricePerDay} Tk</span>
                <span>Location: {vehicle.location}</span>
                <span>Category: {vehicle.category}</span>
                <span>Condition: {vehicle.condition}</span>
                <span>Number Plate: {vehicle.no_plate}</span>
                <span>Chassis Number: {vehicle.chassis_no}</span>
                <span>Registration Number: {vehicle.registration_no}</span>

            </div>


        </div>




    );

}

export default Vehicle
