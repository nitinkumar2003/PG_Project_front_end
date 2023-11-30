import React, { useState } from 'react'
import ButtonCom from './ButtonCom'
import { InputBox } from './InputComponent'
import { useLoginFormStatus, useCustomDispatch } from '../hooks/useLoginFormStatus'
import { actionOfLoginForm } from '../utilities/utilities'
import $Services from '../network/Services'
import konsole from '../network/Konsole'
import { $Constant } from '../utilities/Constant'
import useLoading from '../hooks/useLoading'

const ForgotPasswordCom = ({ showToast }) => {
  const customDispatch = useCustomDispatch()
  const { isLoadingUpdate } = useLoading()
  const [forgotDetails, setForgotDetails] = useState({ 'email': '', 'emailErr': '' })

  const backToLogin = () => {
    customDispatch(actionOfLoginForm[1])
  }

  const handleUiActions = (action) => {
    customDispatch(action)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    handleForgotDetails(id, value)
    if (!$Constant.isEmailRegex(value)) {
      handleForgotDetails('emailErr', 'Please enter valid Email')
    } else {
      handleForgotDetails('emailErr', '')
    }

  }

  const handleForgotDetails = (id, value) => {
    setForgotDetails((prev) => ({ ...prev, [id]: value }));
  }

  const validate = () => {
    if (forgotDetails.emailErr) return true

    if ($Constant.isCheckUndefineNullBlank(forgotDetails.email)) {
      handleForgotDetails('emailErr', ' Email cannot be blank')
      return true;
    }
    return false
  }

  const sendEmail = (e) => {
    e.preventDefault()
    if (validate()) return;
    isLoadingUpdate(true)
    $Services.sentOtp({ email: forgotDetails.email }).then((res) => {
      console.log('res of sent otp', res)
      isLoadingUpdate(false)
      const userEmail = forgotDetails.email
      handleUiActions({ userEmail: userEmail, action: actionOfLoginForm[4], refrencePage: 'ForgotPassword' })
    }).catch((err) => {
      isLoadingUpdate(false)
      console.log('err in sent otp', err)
      handleForgotDetails('emailErr', err.response.data.error)
    })
  }

  return (
    <>
      <div id='loginForm' className="w-full sm:ml-4 sm:text-left"> <span className='cursor-pointer' onClick={() => handleUiActions(actionOfLoginForm[1])}>Back to Login</span>
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <p className=" mb-4 text-center">Please enter your email address to reset your password.</p>
        <div className="flex justify-center items-center">
          <form className="bg-white  rounded  w-80" onSubmit={sendEmail}>
            <InputBox
              id='email'
              allScreen="true"
              placeholder='Enter Your Email'
              onChange={handleChange}
              error={forgotDetails.emailErr}
            />
            <div className='flex justify-center p-8'>
              <ButtonCom label={'Send Email'} onClick={() => sendEmail()} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordCom