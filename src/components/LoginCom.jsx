import React from 'react'
import ButtonCom from './ButtonCom'
import { InputBox } from './InputComponent'
import { useLoginFormStatus, useCustomDispatch } from '../hooks/useLoginFormStatus'
import { actionOfLoginForm } from '../utilities/utilities'

const LoginCom = ({showToast}) => {
    const customDispatch = useCustomDispatch()
    const handleLoginIn = () => {
        customDispatch(actionOfLoginForm[2])
    }
    return (
        <>
            <div id='loginForm' className="w-full sm:ml-4 sm:text-left">
                <div className="flex justify-center items-center">
                    <form className="bg-white p-8 rounded  w-80">
                        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                        <InputBox placeholder='Enter Your Email' allScreen="true"  />
                        <InputBox placeholder='Enter Your Pasword' allScreen="true"  />

                        <div className="text-right m-0">
                            <a href="#" className="text-indigo-600 text-sm hover:underline">Forgot Password?</a>
                        </div>
                        <div className='flex justify-center'>
                        <ButtonCom label={'Login'} />
                        </div>
                        <div className="flex justify-center">
                            <a href="#" className="text-indigo-600 text-sm ">
                                Don't have an account? <span onClick={() => handleLoginIn()} className='hover:underline'> Sign Up</span>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginCom