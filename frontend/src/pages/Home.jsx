import Hero from '../components/Hero';
import rent from '../assets/rent.jpg'
import listcar from '../assets/listcar.jpg'
import driver from '../assets/driver.jpg'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="w-full min-h-screen  p-2">
            <div className="flex justify-center w-full mt-5 sm:mt-14">
                <Hero />
            </div>
            <div className='flex gap-4 flex-wrap mt-20 justify-center text-white'>


                <div className="card bg-base-100 image-full w-96 shadow-xl">
                    <figure>
                        <img
                            src={rent}
                            alt="rent" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Rent A Car!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <Link to="/vehicles" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Rent Now
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 image-full w-96 shadow-xl">
                    <figure>
                        <img
                            src={listcar}
                            alt="listcar" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">List Your Vehicle!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <Link to="/addvehicles" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            List Now
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 image-full w-96 shadow-xl">
                    <figure>
                        <img
                            src={driver}
                            alt="driver" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Hire A Driver!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <Link to="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire Now
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                        </div>
                    </div>
                </div>

            </div>




        </div>
    );
}

export default Home;

