import { useState, useEffect } from "react";
import { aboutuspagecontent1, aboutPagePeopleReview } from "../utilities/Constant"
function AboutUsCom() {

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"/>
      <div  className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"  aria-hidden="true">
        <div   className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"   style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',          }} />
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{clipPath:  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',}}/>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 animate-fade-in ">
        <div className="container p-5 bg-white text-black rounded-lg">
          <h2 className="text-3xl font-bold tracking-tight text-gray-400  sm:text-5xl">About us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-9000">{aboutuspagecontent1}</p>
        </div>
      </div>
      {aboutPagePeopleReview.length > 0 && <TextSlider />}


    </div>
  )
}

export default AboutUsCom



const TextSlider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPrev, setShowPrev] = useState(true);

  const nextSlide = () => {
    if (aboutPagePeopleReview.length - 1 == currentSlide) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide == 0) {
      setCurrentSlide(aboutPagePeopleReview.length - 1)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
  }


  return (
    <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-opacity-50 text-gray-100 p-2 rounded-full" onClick={() => prevSlide()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      
      <div className="m-11 h-fit rounded-lg bg-white p-2">
        <p className="text-2xl p-1">"{aboutPagePeopleReview[currentSlide].reviewText}"</p>
        <p className="text-right bottom-0 ml-1 font-bold mt-1">--{aboutPagePeopleReview[currentSlide].reviewBy}</p>
      </div>
      <button className="absolute  top-1/2 right-0 transform -translate-y-1/2 bg-opacity-50 text-gray-100 p-2 rounded-full" onClick={() => nextSlide()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>

      </button>
    </div>
  );
};




