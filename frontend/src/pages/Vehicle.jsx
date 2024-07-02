import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import gt86 from '../assets/gt86.jpg' //dummy
import apiEndPoint from "../variables";
import { useForm } from 'react-hook-form';

function Vehicle() {
    const { vehicleId } = useParams()
    const [vehicle, setVehicle] = useState({})
    const [drivers, setDrivers] = useState({})
    console.log('vehicle id from params:', vehicleId);
    const [booked, setBooked] = useState(false);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`${apiEndPoint}/api/vehicles/${vehicleId}`, {
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
    }, [vehicleId, booked])

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get(`${apiEndPoint}/api/drivers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setDrivers(response.data.drivers);
                console.log(response.data.drivers);
            } catch (error) {
                console.log('Driver fetch failed:', error);
            }
        };
        fetchDrivers();
    }, []);
    console.log('Drivers:', drivers);
    //BOOKING 

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [total, setTotal] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const validateStartDate = (value) => {
        if (new Date(value) < new Date(today)) {
            return "Start date cannot be in the past";
        }
        return true;
    };

    const validateEndDate = (value) => {
        if (new Date(value) <= new Date(startDate)) {
            return "End date must be at least one day after the start date";
        }
        return true;
    };
    const onSubmit = data => {
        console.log(data);
        console.log(vehicle);
        const startDate = new Date(data.startDate);
        startDate.setHours(0, 0, 0, 0); // Reset time to start of the day
        const endDate = new Date(data.endDate);
        endDate.setHours(0, 0, 0, 0); // Reset time to start of the day
        const dailyRate = vehicle.pricePerDay;
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const driverId = data.driverId;
        const totalAmount = (diffDays * dailyRate);
        const newBooking = { vehicleId: vehicle._id, ownerId: vehicle.ownerId, driverId, bookingStart: startDate, bookingEnd: endDate, totalAmount: totalAmount }
        axios.post(`${apiEndPoint}/api/bookings`, newBooking, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(response => {
                console.log('Success:', response.data);
                setBooked(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <div className="mx-auto max-w-3xl">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
            >

                {/* <SwiperSlide>
                    <img src={gt86} alt="Vehicle 2" className="w-full h-full object-cover rounded-sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/docs/images/carousel/carousel-3.svg" alt="Vehicle 3" className="w-full h-full object-cover rounded-sm" />
                </SwiperSlide>
            </Swiper> */}

                {vehicle.images && vehicle.images.length > 0 && vehicle.images.map((imageArray, index) => (
                    <div key={index}>
                        {[...imageArray].reverse().map((image) => (
                            <SwiperSlide>
                                <img src={`http://localhost:3000/public/images/vehicle-images/${image}`} alt="Vehicle 2" className="w-full h-full object-cover rounded-sm" />
                            </SwiperSlide>
                        ))}
                    </div>
                ))}
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
                    <h1 className="font-medium text-lg text-slate-200">About the Vehicle:</h1>
                    <p className="text-gray-200 dark:text-gray-400">{vehicle.description}</p>
                </div>

                <div className="">
                    {
                        !booked ? <button onClick={() => setIsOpen(true)} className="btn">Book Now</button> : <button className="btn" disabled>Already Booked</button>
                    }
                    {
                        isOpen && !booked && <dialog id="my_modal_4" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
                            <div className="modal-box bg-white p-20  rounded-lg shadow-xl ">
                                <h3 className="font-bold text-center text-lg mb-4">BOOKING INFO</h3>
                                <div className="modal-action">
                                    <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-6 px-20">
                                        <label className="block">
                                            <span className="text-gray-700">Start Date:</span>
                                            <input {...register("startDate", { required: "Start date is required", validate: validateStartDate })} type="date" min={today} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                            {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">End Date:</span>
                                            <input {...register("endDate", { required: "End date is required", validate: validateEndDate })} type="date" min={nextDay.toISOString().split('T')[0]} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                            {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Driver:</span>
                                            <select {...register("driverId", { required: "Driver selection is required" })} defaultValue={drivers[0]._id} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                {drivers.map(driver => (
                                                    <option key={driver._id} value={driver._id}>
                                                        {driver.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                        <input type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                                        <button type="button" onClick={() => setIsOpen(false)} className="btn">Close</button>
                                    </form>
                                </div>

                            </div>
                        </dialog>
                    }
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full mt-12 sm:mt-20 font-medium">
                <div className="grid h-auto md:h-44 flex-grow card bg-gradient-to-r from-purple-500 to-pink-500 rounded-box place-items-center p-4 sm:p-1">
                    <span className="text-md tracking-tighter text-slate-200 w-fit">Owner Name: {vehicle.ownerId && vehicle.ownerId.name}</span>
                    <span>Type: {vehicle.type}</span>
                    <span>Year: {vehicle.year}</span>
                    <span>Location: {vehicle.location}</span>
                    <span>Category: {vehicle.category}</span>
                </div>
                <div className="divider md:divider-horizontal"></div>
                <div className="grid h-auto md:h-44 flex-grow card bg-gradient-to-br from-pink-500 to-orange-400 rounded-box place-items-center p-4 sm:p-1">
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
