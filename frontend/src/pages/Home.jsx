import Hero from '../components/Hero';
import rent from '../assets/rent.jpg'
import listcar from '../assets/listcar.jpg'
import driver from '../assets/driver.jpg'
import addcar from '../assets/addcar.png'
import rentcar from '../assets/rentcar.png'
import hiredriver from '../assets/hiredriver.png'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="w-full min-h-screen overflow-hidden">
    <div className="flex justify-center mt-5 sm:mt-14">
        <Hero />
    </div>
    <div className="flex gap-4 flex-wrap mt-10 sm:mt-24 justify-center text-white px-4">
        <div className="card bg-base-100 image-full w-full max-w-xs sm:w-96 shadow-xl">
            <figure>
                <img src={rent} alt="rent" />
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
        <div className="card bg-base-100 image-full w-full max-w-xs sm:w-96 shadow-xl">
            <figure>
                <img src={listcar} alt="listcar" />
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
        <div className="card bg-base-100 image-full w-full max-w-xs sm:w-96 shadow-xl">
            <figure>
                <img src={driver} alt="driver" />
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
    <div className='flex justify-center mt-10 sm:mt-16  border-cyan-900 max-w-screen-2xl m-auto'>
        <h1 className='text-2xl text-slate-600 font-extrabold'>How It <span className='text-cyan-500'>Works</span></h1>
    </div>
    <div className='flex justify-evenly mt-5 sm:mt-14  border-cyan-700'>
        
        <div className='text-center  border-black max-w-sm'>
            <img className='m-auto max-w-20 max-h-20' src={rentcar} alt="" />
            <h1 className='text-xl text-slate-600 font-semibold mt-4'>Rent A Vehcile</h1>
            <p className='text-sm text-slate-400 mt-2'>Select a date and wait for the approval.</p>
            
        </div>
        
        <div className='text-center  border-black max-w-sm'>
            <img className='m-auto max-w-20 max-h-20' src={addcar} alt="" />
            <h1 className='text-xl text-slate-600 font-semibold mt-4'>Add Your Vehicle</h1>
            <p className='text-sm text-slate-400 font-medium mt-2'>Give necessary details and list it for rent.</p>
            
        </div>
        <div className='text-center  border-black max-w-sm'>
            <img className='m-auto max-w-20 max-h-20' src={hiredriver} alt="" />
            <h1 className='text-xl text-slate-600 font-semibold mt-4'>Hire A Driver</h1>
            <p className='text-sm text-slate-400 font-medium mt-2'>Just need a driver? Select a driver and select the date.</p>
            
        </div>
        



    </div>

</div>
    );
}

export default Home;

