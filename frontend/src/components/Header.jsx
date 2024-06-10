import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {

    let navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('isAdmin')
        navigate('/login')
    }
    return (
        <div>


            <nav className="bg-gradient-to-r  border-gray-200 dark:bg-gray-900 from-slate-800 to-orange-950">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img className='h-12 w-12' src={logo} alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white  bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">WheelzOnRent</span>
                    </Link>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li>
                                <Link to="/" className="block py-2 px-3 text-white rounded md:bg-transparent ">Home</Link>
                            </li>
                            <li>
                                <Link to="#" className="block py-2 px-3 text-slate-300 rounded hover:bg-blue-600 ">About</Link>
                            </li>
                            <li>
                                <Link to="#" className="block py-2 px-3 text-slate-300 rounded hover:bg-blue-600 ">Services</Link>
                            </li>
                            <li>
                                <Link to="#" className="block py-2 px-3 text-slate-300 rounded hover:bg-blue-600 ">Pricing</Link>
                            </li>

                        </ul>
                        {(!localStorage.getItem('authToken')) ?
                            <div className='flex'>
                                <Link to="/signup" className="block py-2 px-3 text-slate-300 rounded hover:bg-blue-600 ">Sign Up</Link>
                                <Link to="/login" className="block py-2 px-3 text-slate-300 rounded hover:bg-blue-600 ">Login</Link>
                            </div>

                            :

                            <div className='flex'>
                                <Link to="/profile" className="block py-2 px-3 text-slate-300 rounded hover:bg-blue-600 ">Profile</Link>
                                <button onClick={handleLogout} to="/logout" className="block py-2 px-3 text-slate-300 rounded hover:bg-blue-600 ">Logout</button>
                            </div>




                        }
                        {(localStorage.getItem('isAdmin') === 'true') ?
                            <div>
                                <Link to='/admin' className='className="block py-2 px-3 text-slate-300 rounded hover:bg-blue-600'>Admin Dashboard</Link>
                            </div>
                            : ''}


                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header
