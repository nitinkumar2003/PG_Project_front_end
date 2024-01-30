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
import { warningMsg } from '../utilities/utilities'

const SignUpCom = ({ showToast }) => {
    const customDispatch = useCustomDispatch()
    const { isLoadingUpdate } = useLoading()
    const apiCallHook = useApiCallHook();
    const data = useLoginFormStatus()
    console.log('data', data)
    const [showOtpScreen, setShowOtpScreen] = useState(false)
    const [signUpDetails, setSignUpDetails] = useState({ name: '', email: '', password: '', nameErr: '', emailErr: '', passwordErr: '' })

    console.log('signUpDetailssignUpDetails', signUpDetails)


    const handleUiActions = (action) => {
        customDispatch(action)
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
            handleSignUpDetails('nameErr',warningMsg?._name_Err)
            return true;
        }
        if ($Constant.isCheckUndefineNullBlank(email)) {
            handleSignUpDetails('emailErr',warningMsg?._email_Err)
            return true;
        }
        if ($Constant.isCheckUndefineNullBlank(password)) {
            handleSignUpDetails('passwordErr',warningMsg?._password_Err)
            return true;
        }
        return false
    }
    function validateEmail(id, value) {
        switch (id) {
            case 'email':
                (!$Constant.isEmailRegex(value)) ? handleSignUpDetails('emailErr',warningMsg?._email_Validate_Err) : handleSignUpDetails('emailErr', '')
                break;
            case 'password':
                (!$Constant.isPasswordRegex(value)) ? handleSignUpDetails('passwordErr',warningMsg?._password_Validate_Err) : handleSignUpDetails('passwordErr', '')
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
                showToast('success',warningMsg?._account_Created_Msg)
                console.log('Response:', res);
                if (res?.payload.status == 200) {
                    const userEmail = res.payload.user.email
                    handleUiActions({ userEmail: userEmail, action: actionOfLoginForm[4],refrencePage:'SignUp' })
                }
            })
    };

    return (
        <>
            <div id='signUpForm' className="w-full sm:ml-4 sm:text-left">
                <div className="flex justify-center items-center">
                    <form className="bg-white p-8 rounded  w-80">
                        <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
                        <InputBox
                            id='name'
                            allScreen="true"
                            placeholder='Enter Your Name'
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            error={signUpDetails.nameErr}
                        />
                        <InputBox
                            id='email'
                            allScreen="true"
                            placeholder='Enter Your Email'
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            error={signUpDetails.emailErr}
                        />
                        <InputBox
                            id='password'
                            placeholder='Enter Your Pasword'
                            allScreen="true"
                            type='password'
                            onChange={handleChange}
                            error={signUpDetails.passwordErr}
                        />
                        <div className='flex justify-center p-2'>
                            <ButtonCom label={'Sign Up'} onClick={handleSignUp} />
                        </div>
                        <div className="flex justify-center">
                            <a href="#" className="text-indigo-600 text-sm">
                                Don't have an account? <span onClick={() => handleUiActions(actionOfLoginForm[1])} className=' hover:underline'> Sign In</span>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUpCom