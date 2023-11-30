import React, { useState } from 'react'
import ButtonCom from './ButtonCom'
import { InputBox } from './InputComponent'
import { useLoginFormStatus, useCustomDispatch } from '../hooks/useLoginFormStatus'
import { actionOfLoginForm } from '../utilities/utilities'
import $Services from '../network/Services'
import konsole from '../network/Konsole'
import useApiCallHook from '../hooks/userApiCall'
import useSessionStorage from '../hooks/useSessionStorage'
import useCustomDispatchHook from '../hooks/useCustomDispatchHook'

const LoginCom = ({ showToast }) => {
    const {isLoginOrNotDispatch} = useCustomDispatchHook()
    const customDispatch = useCustomDispatch()
    const apiCallHook = useApiCallHook();
    const { data, userEmail, refrencePageloginSlice } = useLoginFormStatus()
    const [authToken, setAuthToken] = useSessionStorage('authToken', '')
    const [loggedInUserDetails, setLoggedInUserDetails] = useSessionStorage('loggedInUserDetails', '')
    const [loggedInDetails, setLoggedInDetails] = useState({ email: '', password: '', validateErr: '' })
    console.log('authTokenauthToken',authToken,loggedInUserDetails)

    const handleUiActions = (action) => {
        customDispatch(action)
    }

    const handleChange = (id, value) => {
        setLoggedInDetails(prev => ({
            ...prev, [id]: value
        }))
    }
    const handleLogIn = (e) => {
        e.preventDefault()
        handleChange('validateErr', '')
        $Services.userLogin({ ...loggedInDetails }).then((res) => {
            konsole.log('res of user login', res)
            setAuthToken(res.token)
            setLoggedInUserDetails(res.user)
            isLoginOrNotDispatch(true)
            handleUiActions(actionOfLoginForm[0])
        }).catch((err) => {
            konsole.log('err in user login', err.response)
            handleChange('validateErr', 'Invalie Email Or Password')
        })
    }
    const handleForgot = (e) => {
        e.preventDefault();
        $Services.passwordForgot({ email: 'rt@mailinator.com' }).then((res) => {
            konsole.log('res of user login', res)
        }).catch((err) => {
            konsole.log('err in user login', err)
        })
    }

    return (
        <>
            <div id='loginForm' className="w-full sm:ml-4 sm:text-left">
                <div className="flex justify-center items-center">
                    <form className="bg-white p-8 rounded  w-80">
                        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                        {/* <span className='text-red-600'>{loggedInDetails.validateErr}</span */}
                        <InputBox placeholder='Enter Your Email' id='email' allScreen="true" value={loggedInDetails.email} onChange={(e) => handleChange(e.target.id, e.target.value)} />
                        <InputBox placeholder='Enter Your Pasword' id='password' allScreen="true" value={loggedInDetails.password} error={loggedInDetails.validateErr} onChange={(e) => handleChange(e.target.id, e.target.value)} />

                        <div className="text-right m-0">
                            <a href="#" className="text-indigo-600 text-sm hover:underline" onClick={() => handleUiActions(actionOfLoginForm[3])}>Forgot Password?</a>
                        </div>
                        <div className='flex justify-center p-2'>
                            <ButtonCom label={'Login'} onClick={handleLogIn} />
                        </div>
                        <div className="flex justify-center">
                            <a href="#" className="text-indigo-600 text-sm ">
                                Don't have an account? <span onClick={() => handleUiActions(actionOfLoginForm[2])} className='hover:underline'> Sign Up</span>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginCom