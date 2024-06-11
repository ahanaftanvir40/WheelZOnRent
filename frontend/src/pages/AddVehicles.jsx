import { useState } from "react"
import axios from "axios"
import { VehicleTypes, VehicleCategories } from "../../utils/enum"

function AddVehicles() {
    const [vehicle, setVehicle] = useState({
        type: VehicleTypes.CAR,
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        location: '',
        availability: true,
        images: '',
        category: VehicleCategories.SEDAN,
        condition: '',
        no_plate: '',
        chassis_no: '',
        registration_no: '',
    })

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3000/api/vehicles`, vehicle, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            const json = response.data
            if (json.success) {
                alert('Vehicle Added Successfully')
            } else {
                alert('Failed To add Vehicle')
            }

        } catch (error) {
            console.log(error);
            alert('Failed To add vehicles')
        }
    }
    return (
        <div className="mx-auto max-w-md">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerDay">Price per day:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="pricePerDay" value={vehicle.pricePerDay} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="location" value={vehicle.location} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">Availability:</label>
                    <input className="leading-tight" type="checkbox" name="availability" checked={vehicle.availability} onChange={(e) => setVehicle({ ...vehicle, availability: e.target.checked })} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">Images (comma separated URLs):</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="images" value={vehicle.images} onChange={(e) => setVehicle({ ...vehicle, images: e.target.value.split(',') })} />
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

    )
}

export default AddVehicles
