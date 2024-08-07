import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { VehicleTypes, VehicleCategories } from "../utils/enum";

function AddVehicles() {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        description: '',
        type: VehicleTypes.CAR,
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        location: '',
        latitude: 0,
        longitude: 0,
        availability: true,
        category: VehicleCategories.SEDAN,
        condition: '',
        no_plate: '',
        chassis_no: '',
        registration_no: '',
    });

    const [currentLocation, setCurrentLocation] = useState(false);
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleCheckboxChange = async () => {
        setCurrentLocation(!currentLocation);

        if (!currentLocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setVehicle(prevVehicle => ({ ...prevVehicle, latitude, longitude }));

                const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
                const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
                const json = response.data;
                console.log(json);
                console.log(json.results[0].formatted);
                setVehicle(prevVehicle => ({ ...prevVehicle, location: json.results[0].formatted }));
            },
        (error)=>{
            console.log(error);
        },
        {
            enableHighAccuracy:true
        }
        
    );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in vehicle) {
                formData.append(key, vehicle[key]);
            }
            images.forEach(image => {
                formData.append('vehicleImages', image);
            });

            const response = await axios.post(`http://localhost:3000/api/vehicles`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const json = response.data;
            if (json.success) {
                navigate(`/vehicles/${json.vehicleId}`);
                alert('Vehicle Added Successfully');
            } else {
                alert('Failed To add Vehicle. Please Login');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            alert('Failed To add vehicle');
        }
    };

    return (
        <div className="mx-auto max-w-xl">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type:</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="type" value={vehicle.type} onChange={handleChange}>
                        {Object.values(VehicleTypes).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="brand" value={vehicle.brand} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">Model:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="model" value={vehicle.model} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">Year:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="year" value={vehicle.year} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={vehicle.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerDay">Price per day:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="pricePerDay" value={vehicle.pricePerDay} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="location" value={vehicle.location} onChange={handleChange} required />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">Set Your Current Location as Your Location?</label>
                    <input className="leading-tight" type="checkbox" name="currentLocation" checked={currentLocation} onChange={handleCheckboxChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">Availability:</label>
                    <input className="leading-tight" type="checkbox" name="availability" checked={vehicle.availability} onChange={(e) => setVehicle({ ...vehicle, availability: e.target.checked })} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">Images:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" name="images" multiple onChange={handleImageChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category:</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="category" value={vehicle.category} onChange={handleChange}>
                        {Object.values(VehicleCategories).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="condition">Condition:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="condition" value={vehicle.condition} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no_plate">Number Plate:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="no_plate" value={vehicle.no_plate} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chassis_no">Chassis Number:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="chassis_no" value={vehicle.chassis_no} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration_no">Registration Number:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="registration_no" value={vehicle.registration_no} onChange={handleChange} required />
                </div>

                <div className="mb-6">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Vehicle
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddVehicles;
