import React, { useEffect, useState } from 'react';
import ButtonCom from '../components/ButtonCom';
import { useLoginFormStatus, useCustomDispatch } from '../hooks/useLoginFormStatus';
import $Services from '../network/Services';
import useLoading from '../hooks/useLoading';
import { actionOfLoginForm, warningMsg } from '../utilities/utilities';
import konsole from '../network/Konsole';
import { InputBox } from '../components/InputComponent';
import { $Constant } from '../utilities/Constant';

const OtpCom = ({ showToast }) => {
  const customDispatch = useCustomDispatch()
  const { data, userEmail, refrencePageloginSlice } = useLoginFormStatus()
  const { isLoadingUpdate } = useLoading()
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState(false)
  const [showUpdatePassword, setShowUpdatePassword] = useState(false)
  const [passwordDetails, setPasswordDetails] = useState({ password: '', passwordErr: '' })
  const otpMessage = (<span>We've sent an OTP to <strong style={{ color: 'black' }}>{userEmail}</strong>. Please enter it below to verify.</span>);

  useEffect(() => {
    (userEmail && refrencePageloginSlice !== 'ForgotPassword') && sendOtpToUser()
  }, [userEmail])



  const sendOtpToUser = (e) => {
    isLoadingUpdate(true)
    $Services.sentOtp({ email: userEmail }).then((res) => {
      console.log('res of sent otp', res)
      showToast('success',warningMsg?._otp_Message)
      isLoadingUpdate(false)
    }).catch((err) => {
      isLoadingUpdate(false)
      console.log('err in sent otp', err)
    })
  }
  const handleVerify = (e) => {
    e.preventDefault()
    const enteredOtp = otp.join('');
    let jsonObj = {
      email: userEmail,
      otp: enteredOtp
    }
    // isLoadingUpdate(true)
    $Services.verifyOtp(jsonObj).then((res) => {
      console.log('res of  verify otp', res)
      if (refrencePageloginSlice == 'ForgotPassword') {
        setShowUpdatePassword(true)
      } else {
        showToast('success',warningMsg?._account_Activate_Message)
        customDispatch(actionOfLoginForm[0])
      }
      isLoadingUpdate(false)
    }).catch((err) => {
      isLoadingUpdate(false)
      setOtpError(true)
      setOtp(['', '', '', ''])
      // showToast('error', 'Please enter valid otp.')
      console.log('err in verify otp', err.response.data.status)
    })
  };

  const handleChange = (e, index) => {
    setOtpError(false)
    const value = e.target.value
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 3) {
      document.getElementById(`input${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`input${index - 1}`).focus();
    }
  };


  const handlePasswordChange = (e) => {
    const { id, value } = e.target
    handleUpdatePassword(id, value)
    if (!$Constant.isPasswordRegex(value)) {
      handleUpdatePassword('passwordErr',warningMsg?._password_Validate_Err)
    } else {
      handleUpdatePassword('passwordErr', '')
    }

  }
  const handleUpdatePassword = (id, value) => {
    setPasswordDetails((prev) => ({
      ...prev,
      [id]: value
    }));
  }

  const updatePswd = () => {
    if ($Constant.isCheckUndefineNullBlank(passwordDetails.password)) {
      handleUpdatePassword('passwordErr',warningMsg?._password_Err)
    }
    const jsonObj = {
      password: passwordDetails.password,
      email:userEmail
    }
    $Services.passwordForgot(jsonObj).then((res) => {
      console.log('res of  verify otp', res)
      showToast('success',warningMsg?._password_update_Msg)
      customDispatch(actionOfLoginForm[0])
      isLoadingUpdate(false)
    }).catch((err) => {
      isLoadingUpdate(false)
      console.log('err in update pswd', err, err.response.data.status)
    })
  }

  return (
    <div className="w-full sm:ml-4 sm:text-left">
      {(showUpdatePassword == false) ? <>
        <h2 className="text-2xl font-bold mb-4 text-center">Verify Account</h2>
        <div className="text-center text-gray-600">{otpMessage}</div>
        <div className="flex justify-center items-center mt-8">
          <form className="bg-white rounded w-80">
            <div className="flex justify-center">
              {otp.map((digit, index) => (
                <input
                  id={`input${index}`}
                  key={index}
                  type="text"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleChange(e, index)}
                  className="w-12 h-12 mx-2 text-center border border-gray-300 rounded-md"
                />
              ))}
            </div>
            {otpError && <span className='flex justify-center text-red-500 mt-2'>Please enter valid otp</span>}
            <div className="text-center mt-4">
              <ButtonCom label={'Verify'} onClick={handleVerify} />
            </div>
            <div className="flex justify-center">
              <a href="#" className="text-indigo-600 text-sm hover:underline" onClick={() => sendOtpToUser()}>
                Resend OTP?
              </a>
            </div>
          </form>
        </div>
      </> : <>
        <div className="flex justify-center items-center">
          <form className="bg-white p-8 rounded  w-80">
            <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

            <InputBox
              id='email'
              allScreen="true"
              placeholder='Enter Your Email'
              value={userEmail}
              disable={true}
            />
            <InputBox
              id='password'
              placeholder='Enter Your Pasword'
              allScreen="true"
              onChange={(e) => handlePasswordChange(e)}
              error={passwordDetails.passwordErr}
            />
            <div className='flex justify-center p-2'>
              <ButtonCom label={'Update Password'} onClick={() => updatePswd()} />
            </div>

          </form>
        </div>
      </>}
    </div>
  );
};

export default OtpCom;
