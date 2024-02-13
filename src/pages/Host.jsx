import React from 'react'
import { InputBox } from '../components/InputComponent'
import HostForm from '../components/HostForm'

const Host = () => {
  return (
    <>

      {/* <h5 className='mt-14 font-bold text-2xl sm:text-3xl  mb-4 pb-2 fixed z-20  bg-white ms-8 w-full text-center'>Add Property</h5> */}
      <div className="mx-auto max-w-2xl px-1 py-4 sm:px-3 sm:py-6 lg:max-w-7xl lg:px-2 ">
        <div className='container mx-auto sm:px-6 lg:px-8 shadow pt-1 bg-gray-300'>
          <HostForm />
        </div>
      </div>
    </>
  )
}

export default Host