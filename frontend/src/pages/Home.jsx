import Hero from '../components/Hero';
import rent from '../assets/rent.jpg'
import listcar from '../assets/listcar.jpg'
import driver from '../assets/driver.jpg'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="w-full min-h-screen  p-20">
            <div className="flex justify-center w-full h-full">
                <Hero />
            </div>
            <div className='flex gap-4 flex-wrap mt-20 justify-center text-white'>


                <div className="max-w-sm bg-slate-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="h-[300px] rounded-t-lg object-fill" src={rent} alt="" />
                    </a>
                    <div className="p-5">
                        <Link to="/vehicles">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">Rent A Car</h5>
                        </Link>
                        <p className="mb-3 font-normal  dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, officiis.</p>
                        <Link to="/vehicles" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Rent Now
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="max-w-sm bg-slate-700  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg h-[300px]" src={listcar} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">List Your Car For Rent</h5>
                        </a>
                        <p className="mb-3 font-normal  dark:text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, natus!</p>
                        <Link to="/addvehicles" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            List Now
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="max-w-sm bg-slate-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg h-[300px]" src={driver} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">Hire A Driver</h5>
                        </a>
                        <p className="mb-3 font-normal  dark:text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, quisquam?</p>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire Now
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>




        </div>
    );
}

export default Home;

