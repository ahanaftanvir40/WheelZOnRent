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
            {/* <Swiper
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
            </Swiper> */}
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>

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
            <div className="flex w-full sm:mt-20 mt-12 font-medium">
                <div className="grid h-44 flex-grow card bg-gradient-to-r from-purple-500 to-pink-500  rounded-box place-items-center p-1">
                    <span className="text-md tracking-tighter text-slate-200 w-fit ">Owner Name : {vehicle.ownerId && vehicle.ownerId.name}</span>
                    <span>Type: {vehicle.type}</span>
                    <span>Year: {vehicle.year}</span>
                    <span>Location: {vehicle.location}</span>
                    <span>Category: {vehicle.category}</span>

                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-44 flex-grow card bg-gradient-to-br from-pink-500 to-orange-400  rounded-box place-items-center p-1">
                    <span className="w-fit font-medium text-slate-200">Price per Day: {vehicle.pricePerDay} Tk</span>
                    <span>Condition: {vehicle.condition}</span>
                    <span>Number Plate: {vehicle.no_plate}</span>
                    <span>Chassis Number: {vehicle.chassis_no}</span>
                    <span>Registration Number: {vehicle.registration_no}</span>
                </div>
            </div>




        </div>




    );

}

export default Vehicle
