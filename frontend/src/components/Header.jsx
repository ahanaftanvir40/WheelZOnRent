import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { useState } from 'react'


function Header() {
    const { user } = useAuth()

    let navigate = useNavigate()

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleToggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionClick = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken')

        navigate('/login')
        window.location.reload();
    }
    return (
        <nav className="py-4 shadow-lg shadow-slate-300 bg-white rounded-md dark:bg-gray-900">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo and Branding */}
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img className="h-12 w-12 rounded-full" src={logo} alt="Logo" />
                    <span className="text-2xl font-semibold text-black dark:text-gray-200">WheelzOnRent</span>
                </Link>

                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-8">
                    <li>
                        <Link to="/" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Home</Link>
                    </li>
                    <li>
                        <Link to="#" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">About</Link>
                    </li>
                    <li>
                        <Link to="#" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Services</Link>
                    </li>
                    <li>
                        <Link to="/userdashboard" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Dashboard</Link>
                    </li>
                </ul>

                {/* Auth Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    {!localStorage.getItem('authToken') ? (
                        <>
                            <Link to="/signup" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Sign Up</Link>
                            <Link to="/login" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Login</Link>
                        </>
                    ) : (
                        <div className="relative">
                            <button className="flex items-center space-x-2" onClick={handleToggleDropdown}>
                                <img className="h-10 w-10 rounded-full" src={`http://localhost:3000/public/images/user-avatars/${user.avatar}`} alt="Profile Avatar" />
                                <span className="text-black dark:text-gray-300">Profile</span>
                                <svg className="w-5 h-5 text-black dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-10">
                                    <li>
                                        <Link to="/profile" className="block px-4 py-2 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={handleOptionClick}>
                                            Profile
                                        </Link>
                                    </li>
                                    {user.isAdmin && (
                                        <li>
                                            <Link to="/admin" className="block px-4 py-2 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={handleOptionClick}>
                                                Admin Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <button onClick={() => { handleLogout(); handleOptionClick(); }} className="w-full text-left block px-4 py-2 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button className="text-black dark:text-gray-300 focus:outline-none" onClick={handleToggleDropdown}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {dropdownOpen && (
                <div className="md:hidden flex flex-col space-y-2 mt-4 px-4 bg-white dark:bg-gray-900">
                    <Link to="/" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" onClick={handleOptionClick}>Home</Link>
                    <Link to="#" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" onClick={handleOptionClick}>About</Link>
                    <Link to="#" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" onClick={handleOptionClick}>Services</Link>
                    <Link to="#" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" onClick={handleOptionClick}>Pricing</Link>
                    {!localStorage.getItem('authToken') ? (
                        <>
                            <Link to="/signup" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" onClick={handleOptionClick}>Sign Up</Link>
                            <Link to="/login" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" onClick={handleOptionClick}>Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" onClick={handleOptionClick}>Profile</Link>
                            {user.isAdmin && (
                                <Link to="/admin" className="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" onClick={handleOptionClick}>Admin Dashboard</Link>
                            )}
                            <button onClick={() => { handleLogout(); handleOptionClick(); }} className="text-left text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>

    )
}

export default Header
