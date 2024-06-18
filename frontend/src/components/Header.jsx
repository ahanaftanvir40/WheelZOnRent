import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'

function Header() {
    const { user } = useAuth()

    let navigate = useNavigate()



    const handleLogout = () => {
        localStorage.removeItem('authToken')

        navigate('/login')
        window.location.reload();
    }
    return (
        <div>
            <nav className="py-2">
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo and Branding */}
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img className="h-12 w-12 rounded-full" src={logo} alt="Logo" />
                        <span className="text-2xl font-semibold text-white dark:text-gray-200">WheelzOnRent</span>
                    </Link>

                    {/* Navigation Links */}
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Home</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">About</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Services</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Pricing</Link>
                        </li>
                    </ul>

                    {/* Auth Links */}
                    <div className="flex space-x-4">
                        {!localStorage.getItem('authToken') ? (
                            <>
                                <Link to="/signup" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Sign Up</Link>
                                <Link to="/login" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Login</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/profile" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Profile</Link>
                                <button onClick={handleLogout} className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Logout</button>
                            </>
                        )}
                        {user.isAdmin ? (

                            <Link to="/admin" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Admin Dashboard</Link>

                        ) : ''}


                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Header
