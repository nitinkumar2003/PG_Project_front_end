import React from 'react'
import { InputBox } from '../components/InputComponent'
import HostForm from '../components/HostForm'

const Host = () => {
  return (
    <>
      <div className="m-16 container mx-auto">
        <h5 className='container font-bold text-2xl sm:text-2xl border-b  fixed bg-gray-300 z-20 w-full'>Add Property</h5>
      </div>
      <div className='container mx-auto sm:px-6 lg:px-8 shadow pt-1 bg-gray-300'>
        <HostForm />
      </div>      
    </>
  )
}

export default Host