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
        <div>
            <nav className="py-2 ">
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo and Branding */}
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img className="h-12 w-12 rounded-full" src={logo} alt="Logo" />
                        <span className="text-2xl font-semibold text-white dark:text-gray-200">WheelzOnRent</span>
                    </Link>

                    {/* Navigation Links */}
                    <ul className="hidden md:flex space-x-4">
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button className="text-white focus:outline-none" onClick={handleToggleDropdown}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Auth Links */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {!localStorage.getItem('authToken') ? (
                            <>
                                <Link to="/signup" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Sign Up</Link>
                                <Link to="/login" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Login</Link>
                            </>
                        ) : (
                            <>
                                <div className="dropdown dropdown-end relative">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost btn-circle avatar flex items-center"
                                        onClick={handleToggleDropdown}
                                    >
                                        <div className="w-10 rounded-full">
                                            <img alt="Profile Avatar" src={`http://localhost:3000/public/images/user-avatars/${user.avatar}`} />
                                        </div>
                                        <p className="text-white">Profile</p>
                                    </div>
                                    {dropdownOpen && (
                                        <ul
                                            tabIndex={0}
                                            className="absolute right-0 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                        >
                                            <li>
                                                <Link to="/profile" className="justify-between font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>
                                                    Profile
                                                </Link>
                                            </li>
                                            {user.isAdmin && (
                                                <li>
                                                    <Link to="/admin" className="font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>
                                                        Admin Dashboard
                                                    </Link>
                                                </li>
                                            )}
                                            <li>
                                                <button className='font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300' onClick={() => { handleLogout(); handleOptionClick(); }}>
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {dropdownOpen && (
                    <div className="md:hidden flex flex-col space-y-2 mt-4 px-4">
                        <Link to="/" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>Home</Link>
                        <Link to="#" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>About</Link>
                        <Link to="#" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>Services</Link>
                        <Link to="#" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>Pricing</Link>
                        {!localStorage.getItem('authToken') ? (
                            <>
                                <Link to="/signup" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>Sign Up</Link>
                                <Link to="/login" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>Login</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/profile" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>Profile</Link>
                                {user.isAdmin && (
                                    <Link to="/admin" className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300" onClick={handleOptionClick}>Admin Dashboard</Link>
                                )}
                                <button onClick={() => { handleLogout(); handleOptionClick(); }} className="text-white font-medium dark:text-gray-300 hover:text-blue-500 transition duration-300">Logout</button>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </div>


    )
}

export default Header
