import axios from 'axios';
import React, { useState, useEffect } from 'react';

function UserDashboard() {
    const [pendingBookings, setPendingBookings] = useState([]);
    const [approvedBookings, setApprovedBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/bookings/pending', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const data = await response.data
                const pending = data.filter(booking => booking.status === 'pending');
                const approved = data.filter(booking => booking.status === 'approved');
                setPendingBookings(pending);
                setApprovedBookings(approved);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const approveBooking = async (bookingId) => {
        try {
            await axios.post(`http://localhost:3000/api/bookings/${bookingId}/approve`)


            // Update the local state to reflect the approval
            const approvedBooking = pendingBookings.find(booking => booking._id === bookingId);
            setPendingBookings(pendingBookings.filter(booking => booking._id !== bookingId));

            setApprovedBookings([...approvedBookings, { ...approvedBooking, status: 'approved' }]);
        } catch (error) {
            console.error('Error approving booking:', error);
        }
    };

    return (
        <div>
            <div className="flex w-full flex-col">
                <div className="card bg-base-300 rounded-box grid h-fit place-items-center">
                    <h1>All Pending Bookings</h1>
                </div>
                <div className="divider"></div>
                <div className="card bg-base-300 rounded-box grid h-fit place-items-center">
                    <div className='flex flex-wrap'>
                        {pendingBookings.map(booking => (
                            <div key={booking._id} className="card glass w-96 m-2">
                                <figure>
                                    <img
                                        src={`http://localhost:3000/public/images/vehicle-images/${booking.vehicleId.images[0][0]}`} // Assuming you have an imageUrl field in your Vehicle model
                                        alt="vehicle" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{booking.vehicleId.name}</h2>
                                    <p>Booked by: {booking.userId.name}</p>
                                    <p>From: {new Date(booking.bookingStart).toLocaleDateString()}</p>
                                    <p>To: {new Date(booking.bookingEnd).toLocaleDateString()}</p>
                                    <div className="card-actions justify-end">
                                        <button onClick={() => approveBooking(booking._id)} className="btn btn-primary">Approve</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="card  rounded-box grid h-fit place-items-center">
                    <h1>All Approved Bookings</h1>
                </div>
                <div className="divider"></div>
                <div className="card  rounded-box grid h-fit place-items-center">
                    <div className='flex flex-wrap'>
                        {approvedBookings.map(booking => (
                            <div key={booking._id} className="card glass w-96 m-2">
                                <figure>
                                    <img
                                        src={`http://localhost:3000/public/images/vehicle-images/${booking.vehicleId.images[0][0]}`} // Assuming you have an imageUrl field in your Vehicle model
                                        alt="vehicle" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{booking.vehicleId.name}</h2>
                                    <p>Booked by: {booking.userId.name}</p>
                                    <p>From: {new Date(booking.bookingStart).toLocaleDateString()}</p>
                                    <p>To: {new Date(booking.bookingEnd).toLocaleDateString()}</p>
                                    <p>Status: {booking.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;

