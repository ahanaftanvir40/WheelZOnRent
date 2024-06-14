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
