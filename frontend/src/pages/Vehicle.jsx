import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import gt86 from "../assets/gt86.jpg"; //dummy
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/auth";
import ChatComponent from "../components/ChatComponent";
import OwnerChatComponent from "../components/OwnerChatComponent";

import {
  MapIcon,
  CalendarIcon,
  FuelIcon,
  UsersIcon,
  CarIcon,
  StarIcon,
  CogIcon,
  MapPinnedIcon,
  UserRoundIcon,
} from "lucide-react";

function Vehicle() {
  const { user } = useAuth();
  const authUser = user && user._id;
  const authUserName = user && user.name;
  console.log("User auth : ", user._id);
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState({});
  const [drivers, setDrivers] = useState({});
  console.log("vehicle id from params:", vehicleId);
  const [booked, setBooked] = useState(false);

  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/vehicles/${vehicleId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setVehicle(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Vehicle fetch failed:", error);
      }
    };
    fetchVehicle();
  }, [vehicleId, booked]);

  //fetch unavailable dates
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bookings/unavailable-dates/${vehicleId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setUnavailableDates(response.data.unavailableDates);
        console.log("Unavailable Dates:", response.data.unavailableDates);

      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    fetchUnavailableDates();
  }, []); // Dependency array includes `vehicleId`


  //fetch drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/drivers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setDrivers(response.data.drivers);
        console.log(response.data.drivers);
      } catch (error) {
        console.log("Driver fetch failed:", error);
      }
    };
    fetchDrivers();
  }, []);
  console.log("Drivers:", drivers);
  //BOOKING

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
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
  const onSubmit = (data) => {
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
    const totalAmount = diffDays * dailyRate;
    const newBooking = {
      vehicleId: vehicle._id,
      ownerId: vehicle.ownerId,
      driverId,
      bookingStart: startDate,
      bookingEnd: endDate,
      totalAmount: totalAmount,
    };
    axios
      .post(`http://localhost:3000/api/bookings`, newBooking, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        setBooked(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // console.log('Vehicle ID from fetch:' , vehicle._id);
  const ownerID = vehicle.ownerId && vehicle.ownerId._id;
  return (
    <div className="mx-auto max-w-sm sm:max-w-full py-8 min-h-screen w-full sm:px-52 ">
      <div className="max-w-sm sm:max-w-2xl items-center m-auto">
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

          {vehicle.images &&
            vehicle.images.length > 0 &&
            vehicle.images.map((imageArray, index) => (
              <div key={index}>
                {[...imageArray].reverse().map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`http://localhost:3000/public/images/vehicle-images/${image}`}
                      alt="Vehicle 2"
                      className=" object-contain object-center rounded-sm"
                    />
                  </SwiperSlide>
                ))}
              </div>
            ))}
        </Swiper>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-3 sm:mt-5">
        <div>
          <h1 className="flex items-center mb-2 sm:mb-1 text-4xl sm:text-5xl font-extrabold text-slate-700 dark:text-white mt-3">
            {vehicle.brand}
            <span className="bg-blue-100 text-blue-800 text-xl sm:text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
              {vehicle.model}
            </span>
          </h1>
        </div>
        <h1
          className={`py-4 px-4 rounded-lg text-center text-xl font-semibold  sm:mt-0 ${vehicle.availability
            ? "bg-gradient-to-r from-teal-200 to-lime-200 text-black/80"
            : "bg-red-500 text-white"
            }`}
        >
          {vehicle.availability ? "Available" : "Not Available"}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-start items-start mt-4">
        <div className="w-full sm:w-3/4 sm:min-h-[600px] shadow-md shadow-slate-400 dark:shadow-zinc-600 p-4 rounded-lg dark:bg-zinc-900">
          <h1 className="text-3xl dark:text-white/90 text-black mb-4">
            Vehicle Details
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center dark:text-white/80">
              <CarIcon className="mr-2 h-5 w-5" />
              <span>{vehicle.category}</span>
            </div>
            <div className="flex items-center dark:text-white/80">
              <UsersIcon className="mr-2 h-5 w-5" />
              <span>5 Seats</span>
            </div>
            <div className="flex items-center dark:text-white/80">
              <CogIcon className="mr-2 h-5 w-5" />
              <span>Automatic</span>
            </div>
            <div className="flex items-center dark:text-white/80">
              <CalendarIcon className="mr-2 h-5 w-5" />
              <span>{vehicle.year} Model</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg sm:text-2xl font-semibold mb-2 dark:text-white/90">
              Description
            </h3>
            <div className="dark:text-white/80 min-h-32 max-h-32 overflow-y-auto ">
              {vehicle.description}
            </div>
          </div>

          <div className="mt-8 ">
            <h1 className="text-lg sm:text-3xl font-semibold mb-2 dark:text-white/90">
              Booking Information
            </h1>
            <div className="mt-4">
              <div className="flex items-center mb-1 dark:text-white/80">
                <UserRoundIcon className="mr-2 h-5 w-5" />
                <span>{vehicle.ownerId && vehicle.ownerId.name}</span>
              </div>
              <div className="flex items-center dark:text-white/80">
                <MapPinnedIcon className="mr-2 h-5 w-5" />
                <span>{vehicle.location}</span>
              </div>
              <h1 className="mt-1 font-semibold sm:text-2xl text-md text-black dark:text-white/80">
                {vehicle.pricePerDay}Tk / day
              </h1>
              <div className="flex items-center mb-4 mt-2">
                <StarIcon className="text-yellow-400 mr-1" />
                <StarIcon className="text-yellow-400 mr-1" />
                <StarIcon className="text-yellow-400 mr-1" />
                <StarIcon className="text-yellow-400 mr-1" />
                <StarIcon className="text-yellow-400 mr-1" />
                <span className="ml-2 text-sm text-muted-foreground dark:text-white/60">
                  (48 reviews)
                </span>
              </div>
              <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row  gap-4">
                <div>
                  {!booked ? (
                    <button
                      onClick={() => setIsOpen(true)}
                      className="btn border-none bg-blue-700 text-white hover:bg-blue-500"
                    >
                      Book Now
                    </button>
                  ) : (
                    <button
                      className="btn bg-slate-500 dark:text-white/60"
                      disabled
                    >
                      Already Booked
                    </button>
                  )}
                  {/* {isOpen && !booked && (
                                        <dialog id="my_modal_4" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                            <div className="modal-box bg-white p-6 sm:p-20 rounded-lg shadow-xl w-full max-w-lg">
                                                <h3 className="font-bold text-center text-lg mb-4">BOOKING INFO</h3>
                                                <div className="modal-action">
                                                    <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-6 px-4 sm:px-20">
                                                        <label className="block">
                                                            <span className="text-gray-700">Start Date:</span>
                                                            <input
                                                                {...register("startDate", { required: "Start date is required", validate: validateStartDate })}
                                                                type="date"
                                                                min={today}
                                                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                            />
                                                            {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
                                                        </label>
                                                        <label className="block">
                                                            <span className="text-gray-700">End Date:</span>
                                                            <input
                                                                {...register("endDate", { required: "End date is required", validate: validateEndDate })}
                                                                type="date"
                                                                min={nextDay.toISOString().split('T')[0]}
                                                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                            />
                                                            {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
                                                        </label>
                                                        <label className="block">
                                                            <span className="text-gray-700">Driver:</span>
                                                            <select
                                                                {...register("driverId", { required: "Driver selection is required" })}
                                                                defaultValue={drivers[0]._id}
                                                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                            >
                                                                {drivers.map((driver) => (
                                                                    <option key={driver._id} value={driver._id}>
                                                                        {driver.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </label>
                                                        <input
                                                            type="submit"
                                                            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        />
                                                        <button type="button" onClick={() => setIsOpen(false)} className="btn">
                                                            Close
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    )} */}

                  {isOpen && (
                    <dialog
                      id="my_modal_4"
                      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                    >
                      <div className="modal-box bg-white p-6 sm:p-20 rounded-lg shadow-xl w-full max-w-lg">
                        <h3 className="font-bold text-center text-lg mb-4">
                          BOOKING INFO
                        </h3>
                        <div className="modal-action">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            method="dialog"
                            className="space-y-6 px-4 sm:px-20"
                          >
                            {/* Start Date */}
                            <label className="block">
                              <span className="text-gray-700">Start Date:</span>
                              <input
                                {...register("startDate", {
                                  required: "Start date is required",
                                  validate: validateStartDate,
                                })}
                                type="date"
                                min={today}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                              {errors.startDate && (
                                <p className="text-red-500">
                                  {errors.startDate.message}
                                </p>
                              )}
                            </label>

                            {/* End Date */}
                            <label className="block">
                              <span className="text-gray-700">End Date:</span>
                              <input
                                {...register("endDate", {
                                  required: "End date is required",
                                  validate: validateEndDate,
                                })}
                                type="date"
                                min={nextDay.toISOString().split("T")[0]}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                              {errors.endDate && (
                                <p className="text-red-500">
                                  {errors.endDate.message}
                                </p>
                              )}
                            </label>

                            {/* Driver */}
                            <label className="block">
                              <span className="text-gray-700">Driver:</span>
                              <select
                                {...register("driverId", {
                                  required: "Driver selection is required",
                                })}
                                defaultValue={drivers[0]._id}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              >
                                {drivers.map((driver) => (
                                  <option key={driver._id} value={driver._id}>
                                    {driver.name}
                                  </option>
                                ))}
                              </select>
                            </label>

                            {/* Submit and Close Buttons */}
                            <input
                              type="submit"
                              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => setIsOpen(false)}
                              className="btn"
                            >
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  )}
                </div>

                <div className="">
                  {authUser !== ownerID && (
                    <ChatComponent
                      vehicleId={vehicleId}
                      ownerId={vehicle.ownerId && vehicle.ownerId._id}
                      userId={authUser}
                      username={authUserName}
                      ownerName={vehicle.ownerId && vehicle.ownerId.name}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-2/5 h-full">
          <div className="max-w-full">
            <div className="flex justify-center">
              {vehicle.latitude && vehicle.latitude !== 0 && (
                <MapContainer
                  center={[vehicle.latitude, vehicle.longitude]}
                  zoom={13}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[vehicle.latitude, vehicle.longitude]} />
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {authUser !== ownerID && (
                <ChatComponent vehicleId={vehicleId} ownerId={vehicle.ownerId && vehicle.ownerId._id} userId={authUser} username={authUserName} ownerName={vehicle.ownerId && vehicle.ownerId.name} />

            )} */}
      {authUser === ownerID && (
        <OwnerChatComponent
          vehicleId={vehicleId}
          ownerId={vehicle.ownerId && vehicle.ownerId._id}
        />
      )}
    </div>
  );
}

export default Vehicle;
