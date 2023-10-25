import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLoginFormStatus, useCustomDispatch } from '../hooks/useLoginFormStatus';
import LoginCom from '../components/LoginCom';
import { actionOfLoginForm } from '../utilities/utilities';
import SignUpCom from '../components/SignUpCom';
import OtpCom from './Otp';


export default function Login({showToast}) {
  const [open, setOpen] = useState(true)

  const { isLoginForm, isLoginSignUpForm, isSignUpForm } = useLoginFormStatus()
  console.log('isLoginSignUpForm',isLoginSignUpForm,isLoginForm,isSignUpForm)
  const customDispatch = useCustomDispatch()
  const handleLoginIn = (action) => {
    customDispatch(action)
  }


  return (
    <Transition.Root show={isLoginSignUpForm} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => handleLoginIn(actionOfLoginForm[0])} >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"> &#8203;</span>

          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <button type="button" className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-6" onClick={() => handleLoginIn(actionOfLoginForm[0])} >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/*--------------------------------------- Login Form content---------------------------------------------------------------------- */}
                  {isLoginForm && <LoginCom showToast={showToast} />}
                  {isSignUpForm && <SignUpCom showToast={showToast} />}
                  {/* {isSignUpForm && <OtpCom email='abab@mailinator.com' />} */}
                  
                  {/*--------------------------------------- Login Form content---------------------------------------------------------------------- */}
                </div>
              </div>
            </div>

          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
