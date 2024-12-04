import axios from "axios";
import { useState, useEffect } from "react";

function UserDashboard() {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [user, setUser] = useState({});
  const [userBooking, setUserBooking] = useState([]);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3000/api/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUserBooking(
        userBooking.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.log("Error deleting requested rent vehicle", error);
    }
  };

<<<<<<< HEAD
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/bookings/pending`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const data = await response.data;
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
            await axios.post(`http://localhost:3000/api/bookings/${bookingId}/approve`);
            const approvedBooking = pendingBookings.find(booking => booking._id === bookingId);
            setPendingBookings(pendingBookings.filter(booking => booking._id !== bookingId));
            setApprovedBookings([...approvedBookings, { ...approvedBooking, status: 'approved' }]);
        } catch (error) {
            console.error('Error approving booking:', error);
        }
    };



    const fetchUser = async () => {
        let response = await axios.get(`http://localhost:3000/api/user`, {
=======
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bookings/pending`,
          {
>>>>>>> 2b4d0b45d51ad7b2ffc5bdcf37043d34a79a9305
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        const data = await response.data;
        const pending = data.filter((booking) => booking.status === "pending");
        const approved = data.filter(
          (booking) => booking.status === "approved"
        );
        setPendingBookings(pending);
        setApprovedBookings(approved);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const approveBooking = async (bookingId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/bookings/${bookingId}/approve`
      );
      const approvedBooking = pendingBookings.find(
        (booking) => booking._id === bookingId
      );
      setPendingBookings(
        pendingBookings.filter((booking) => booking._id !== bookingId)
      );
      setApprovedBookings([
        ...approvedBookings,
        { ...approvedBooking, status: "approved" },
      ]);
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const fetchUser = async () => {
    let response = await axios.get(`http://localhost:3000/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.status === 200) {
      setUser(response.data);
    }
  };

<<<<<<< HEAD
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 sm:mt-10 mt-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                    <img src={`http://localhost:3000/public/images/user-avatars/${user?.avatar || 'default-avatar.jpg'}`} alt={`${user?.name || 'User'}'s avatar`} className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="text-xl font-bold text-gray-300">Welcome, {user.name}</h1>
                    <p className="text-gray-300">to your Dashboard</p>
                </div>
            </div>

            <div className="mb-8 overflow-x-auto">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Rent Requests</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className='text-black/60'>
                            <th className="py-2 px-4">Vehicle</th>
                            <th className="py-2 px-4">Owner</th>
                            <th className="py-2 px-4">Contact</th>
                            <th className="py-2 px-4">From</th>
                            <th className="py-2 px-4">To</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...userBooking].reverse().map(booking => (
                            <tr key={booking._id} className='text-black/70'>
                                <td className="border px-4 py-2">{booking.vehicleId.brand} {booking.vehicleId.model}</td>
                                <td className="border px-4 py-2">{booking.ownerId.name}</td>
                                <td className="border px-4 py-2">{booking.ownerId.phoneNumber}</td>
                                <td className="border px-4 py-2">{new Date(booking.bookingStart).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{new Date(booking.bookingEnd).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{booking.status}</td>
                                <td className="border px-4 py-2">
                                    {booking.status !== 'approved' && (
                                        <button onClick={() => handleDelete(booking._id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Cancel Booking</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8 overflow-x-auto">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Approve Rent Requests</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className='text-black/60'>
                            <th className="py-2 px-4">Vehicle</th>
                            <th className="py-2 px-4">Booked by</th>
                            <th className="py-2 px-4">From</th>
                            <th className="py-2 px-4">To</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingBookings.map(booking => (
                            <tr key={booking._id} className='text-black/70'>
                                <td className="border px-4 py-2">{booking.vehicleId.brand} {booking.vehicleId.model}</td>
                                <td className="border px-4 py-2">{booking.userId.name}</td>
                                <td className="border px-4 py-2">{new Date(booking.bookingStart).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{new Date(booking.bookingEnd).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => approveBooking(booking._id)} className="bg-green-500 text-white px-2 py-1 rounded text-sm">Approve</button>
                                    <button onClick={() => handleDelete(booking._id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-4">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8 overflow-x-auto">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">All Approved Rent History</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className='text-black/60'>
                            <th className="py-2 px-4">Vehicle</th>
                            <th className="py-2 px-4">Booked by</th>
                            <th className="py-2 px-4">From</th>
                            <th className="py-2 px-4">To</th>
                            <th className="py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedBookings.map(booking => (
                            <tr key={booking._id} className='text-black/60'>
                                <td className="border px-4 py-2">{booking.vehicleId.brand} {booking.vehicleId.model}</td>
                                <td className="border px-4 py-2">{booking.userId.name}</td>
                                <td className="border px-4 py-2">{new Date(booking.bookingStart).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{new Date(booking.bookingEnd).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
=======
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUserBooking = async () => {
    let response = await axios.get(`http://localhost:3000/api/user/bookings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    console.log(response.data);
    setUserBooking(response.data);
  };

  useEffect(() => {
    fetchUserBooking();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
          <img
            src={`http://localhost:3000/public/images/user-avatars/${
              user?.avatar || "default-avatar.jpg"
            }`}
            alt={`${user?.name || "User"}'s avatar`}
            className="w-full h-full object-cover"
          />
>>>>>>> 2b4d0b45d51ad7b2ffc5bdcf37043d34a79a9305
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-600">to your Dashboard</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Your Rent Requests
        </h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Vehicle</th>
              <th className="py-2">Owner</th>
              <th className="py-2">Contact</th>
              <th className="py-2">From</th>
              <th className="py-2">To</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...userBooking].reverse().map((booking) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">
                  {booking.vehicleId.brand} {booking.vehicleId.model}
                </td>
                <td className="border px-4 py-2">{booking.ownerId.name}</td>
                <td className="border px-4 py-2">
                  {booking.ownerId.phoneNumber}
                </td>
                <td className="border px-4 py-2">
                  {new Date(booking.bookingStart).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(booking.bookingEnd).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{booking.status}</td>
                <td className="border px-4 py-2">
                  {booking.status !== "approved" && (
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Cancel Booking
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Approve Rent Requests
        </h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Vehicle</th>
              <th className="py-2">Booked by</th>
              <th className="py-2">From</th>
              <th className="py-2">To</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.vehicleId.name}</td>
                <td className="border px-4 py-2">{booking.userId.name}</td>
                <td className="border px-4 py-2">
                  {new Date(booking.bookingStart).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(booking.bookingEnd).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => approveBooking(booking._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-4"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          All Approved Rent History
        </h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Vehicle</th>
              <th className="py-2">Booked by</th>
              <th className="py-2">From</th>
              <th className="py-2">To</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.vehicleId.name}</td>
                <td className="border px-4 py-2">{booking.userId.name}</td>
                <td className="border px-4 py-2">
                  {new Date(booking.bookingStart).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(booking.bookingEnd).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDashboard;
