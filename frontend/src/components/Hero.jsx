import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="min-h-[400px] bg-[url('./assets/hero.jpg')] bg-cover rounded p-8 text-white">
                <h1 className="text-6xl  bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">Welcome To WheelzOnRent</h1>
                <p className="mt-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ullam recusandae eum officia in, cumque harum labore culpa provident. Sunt.
                </p>
                <Link
                    to="/vehicles"
                    className="inline-block mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Explore Vehicles
                </Link>
            </div>
        </div>
    );
}

export default Hero;


