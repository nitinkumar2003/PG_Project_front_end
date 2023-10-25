import React, { useState } from 'react'
import ButtonCom from './ButtonCom'
import { InputBox } from './InputComponent'
import { useLoginFormStatus, useCustomDispatch } from '../hooks/useLoginFormStatus'
import { actionOfLoginForm } from '../utilities/utilities'
import useApiCallHook from '../hooks/userApiCall'
import { $Constant } from '../utilities/Constant'
import OtpCom from '../pages/Otp'
import axios from 'axios'
import useLoading from '../hooks/useLoading'

const SignUpCom = ({ showToast }) => {
    const customDispatch = useCustomDispatch()
    const { isLoadingUpdate } = useLoading()
    const apiCallHook = useApiCallHook();
    const data = useLoginFormStatus()
    console.log('data', data)
    const [showOtpScreen, setShowOtpScreen] = useState(false)
    const [signUpDetails, setSignUpDetails] = useState({ name: '', email: '', password: '', nameErr: '', emailErr: '', passwordErr: '' })

    console.log('signUpDetailssignUpDetails', signUpDetails)

    const handleLoginIn = () => {
        customDispatch(actionOfLoginForm[1])
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        handleSignUpDetails(id, value)
        validateEmail(id, value)
    }
    function handleBlur(e) {
        console.log('handleBkur', e.target.value, e.target.id)
        const { value, id } = e.target
        // validateEmail(id, value)
    }
    const validateFun = () => {
        const { name, email, password, nameErr, emailErr, passwordErr } = signUpDetails

        if (nameErr || emailErr || passwordErr) {
            return true
        }
        if ($Constant.isCheckUndefineNullBlank(name)) {
            handleSignUpDetails('nameErr', ' Name cannot be blank')
            return true;
        }
        if ($Constant.isCheckUndefineNullBlank(email)) {
            handleSignUpDetails('emailErr', ' Email cannot be blank')
            return true;
        }
        if ($Constant.isCheckUndefineNullBlank(password)) {
            handleSignUpDetails('passwordErr', ' Password cannot be blank')
            return true;
        }
        return false
    }

    function validateEmail(id, value) {
        switch (id) {
            case 'email':
                (!$Constant.isEmailRegex(value)) ? handleSignUpDetails('emailErr', 'Please enter valid Email') : handleSignUpDetails('emailErr', '')
                break;
            case 'password':
                (!$Constant.isPasswordRegex(value)) ? handleSignUpDetails('passwordErr', 'Please emter valid password') : handleSignUpDetails('passwordErr', '')
                break;
            case 'name': handleSignUpDetails('nameErr', '')

        }
    }
    const handleSignUpDetails = (id, value) => {
        setSignUpDetails((prev) => ({
            ...prev,
            [id]: value
        }));
    }
    const handleSignUp = (e) => {
        e.preventDefault();
        if (validateFun()) return;
        isLoadingUpdate(true)
        apiCallHook.callSignUpApi(signUpDetails)
            .then((res) => {
                isLoadingUpdate(false)
                showToast('success', 'Account created successsfully.')
                console.log('Response:', res);
                if (res?.payload.status == 200) {
                    setShowOtpScreen(true)

                }
            })
    };

    return (
        <>
            {(showOtpScreen == false) ?
                <div id='signUpForm' className="w-full sm:ml-4 sm:text-left">
                    <div className="flex justify-center items-center">
                        <form className="bg-white p-8 rounded  w-80">
                            <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
                            <InputBox
                                id='name'
                                allScreen="true"
                                placeholder='Enter Your Name'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                error={signUpDetails.nameErr}
                            />
                            <InputBox
                                id='email'
                                allScreen="true"
                                placeholder='Enter Your Email'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                error={signUpDetails.emailErr}
                            />
                            <InputBox
                                id='password'
                                placeholder='Enter Your Pasword'
                                allScreen="true"
                                handleChange={handleChange}
                                error={signUpDetails.passwordErr}
                            />

                            <div className="text-right m-0">
                                <a href="#" className="text-indigo-600 text-sm hover:underline">Forgot Password?</a>
                            </div>
                            <div className='flex justify-center'>
                                <ButtonCom label={'SignUp'} onClick={handleSignUp} />
                            </div>
                            <div className="flex justify-center">
                                <a href="#" className="text-indigo-600 text-sm">
                                    Don't have an account? <span onClick={() => handleLoginIn()} className=' hover:underline'> Sign In</span>
                                </a>
                            </div>
                        </form>
                    </div>
                </div> : <>
                    <OtpCom email={signUpDetails.email}  showToast={showToast}/>
                </>}
        </>
    )
}

export default SignUpCom