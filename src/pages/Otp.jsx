import React, { useEffect, useState } from 'react';
import ButtonCom from '../components/ButtonCom';
import { useLoginFormStatus } from '../hooks/useLoginFormStatus';
import { useCustomDispatch } from '../hooks/useLoginFormStatus';
import $Services from '../network/Services';
import useLoading from '../hooks/useLoading';
import { actionOfLoginForm } from '../utilities/utilities';

const OtpCom = ({ email, showToast }) => {
  const customDispatch = useCustomDispatch()
  const { data } = useLoginFormStatus()
  const { isLoadingUpdate } = useLoading()
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpMessage = (<span>We've sent an OTP to <strong style={{ color: 'black' }}>{email}</strong>. Please enter it below to verify.</span>);

  useEffect(() => {
    sendOtpToUser()
  }, [data])



  const sendOtpToUser = (e) => {
    isLoadingUpdate(true)
    $Services.sentOtp({ email: email }).then((res) => {
      console.log('res of  sent otp', res)
      showToast('success', 'Otp Sent successfully.')
      isLoadingUpdate(false)
    }).catch((err) => {
      console.log('err in sent otp', err)
    })
  }
  const handleVerify = () => {
    const enteredOtp = otp.join('');
    let jsonObj = {
      email: email,
      otp: enteredOtp
    }
    isLoadingUpdate(true)
    $Services.verifyOtp(jsonObj).then((res) => {
      console.log('res of  verify otp', res)
      showToast('success', 'Account Activate successfully.')
      customDispatch(actionOfLoginForm[0])
      isLoadingUpdate(false)
    }).catch((err) => {
      isLoadingUpdate(false)
      console.log('err in verify otp', err.response.data.status)
    })
  };

  const handleChange = (e, index) => {
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


  return (
    <div className="w-full sm:ml-4 sm:text-left">
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
          <div className="text-center mt-4">
            <ButtonCom label={'Verify'} onClick={handleVerify} />
          </div>
          <div className="flex justify-center mt-4">
            <a href="#" className="text-indigo-600 text-sm hover:underline" onClick={() => sendOtpToUser()}>
              Resend OTP?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpCom;
