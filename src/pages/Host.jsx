import React from 'react'
import { InputBox } from '../components/InputComponent'
import HostForm from '../components/HostForm'

const Host = () => {
  return (
    <div className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 shadow">
      <h5 className='font-bold text-2xl sm:text-2xl border-b mb-4 pb-2'>Add Property</h5>
      <HostForm />
    </div>
  )
}

export default Host