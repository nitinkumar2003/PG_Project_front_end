import React from 'react';
import backgroundImage from '../assets/home-backgorud1.jpg'
import AboutUsCom from '../components/AboutUs';

const Home = () => {

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-fixed 	opacity-100"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="text-center bg-white p-4 rounded-lg animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl animate-fade-in"> Best and Affordable PGs</h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Explore Now </a>
          </div>
        </div>
      </div>
      <div>
       <AboutUsCom />
      </div>
    </>
  );
}

export default Home;
