import axios from "axios"
import { useEffect, useState } from "react"

function UserProfile() {

  const [user, setUser] = useState(null)
  useEffect(() => {
    const fetchUser = async () => {

      try {
        let response = await axios.get(`http://localhost:3000/api/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }


    }
    fetchUser()
  }, [])

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl bg-gradient-to-r from-green-400 to-lime-500

 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">


        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-32 h-32 mb-4 rounded-full shadow-lg"
            src={`http://localhost:3000/public/images/user-avatars/${user.avatar}`}
            alt={`${user.name}'s avatar`}
          />
          <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Welcome {user.name} to your profile
          </p>
          <div className="w-3/4">
            <div className="text-left mb-4">
              <h6 className="text-lg font-medium text-gray-900 dark:text-white">
                Driving License Number
              </h6>
              <p className="text-sm text-slate-700 dark:text-gray-400">
                {user.drivingLicense}
              </p>
            </div>
            <div className="text-left mb-4">
              <h6 className="text-lg font-medium text-gray-900 dark:text-white">
                Driving License Image
              </h6>
              <img
                className="w-full h-72 rounded-lg shadow-lg"
                src={`http://localhost:3000/public/images/license-images/${user.licenseFile}`}
                alt="Driving License"
              />
            </div>
            <div className="text-left mb-4">
              <h6 className="text-lg font-medium text-gray-900 dark:text-white">
                National ID Number
              </h6>
              <p className="text-sm text-slate-700 dark:text-gray-400">
                {user.nationalId}
              </p>
            </div>
          </div>
          <div className="flex mt-4 space-x-4">
            <a
              href="#"
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            >
              Edit
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Update
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
