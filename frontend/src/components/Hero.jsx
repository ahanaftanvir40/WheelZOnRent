import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div>
        <section className="relative bg-center bg-cover bg-[url('./assets/hero.jpg')] bg-gray-700 bg-blend-overlay rounded-md w-full h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          <div className="relative px-4 mx-auto max-w-screen-xl text-center py-8 lg:py-16">
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white drop-shadow-lg">
              Welcome to WheelZOnRent
            </h1>
            <p className="mb-6 text-lg sm:text-xl md:text-2xl font-normal text-gray-300 drop-shadow-lg">
              Discover the perfect ride for your journey, with technology, innovation, and comfort.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Link
                to="/vehicles"
                className="inline-flex justify-center mt-1 sm:mt-3 items-center py-3 px-6 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition ease-in-out duration-300"
              >
                Explore Vehicles
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>

    );
}

export default Hero;


