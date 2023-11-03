import { useState, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { navigationLink } from '../utilities/utilities';
import { useNavigate } from 'react-router-dom';
import { useLoginFormStatus, useCustomDispatch } from '../hooks/useLoginFormStatus';
import { actionOfLoginForm } from '../utilities/utilities';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Header({ children }) {

  const { isLoginForm, isLoginSignUpForm, isSignUpForm } = useLoginFormStatus()
  const customDispatch = useCustomDispatch()
  const navigate = useNavigate()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navigationList, setNavigationList] = useState(navigationLink)
  console.log('isLoginSignUpForm', isLoginSignUpForm)


  const handleRoute = (name, tonavigate) => {
    setNavigationList(navigationList.map(item => ({ ...item, current: item.name == name })));
    navigate(tonavigate)
    setIsMobileMenuOpen(false)
  }
  const handleLoginIn = () => {
    customDispatch(actionOfLoginForm[0])
    setIsMobileMenuOpen(false)
  }


  return (
    <>
      <div className="min-h-full">
        <div className="fixed top-0 w-full bg-gray-600 z-50">
          <Disclosure as="nav" className="bg-gray-600">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 text-white">
                        {/* <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> */}
                        NK
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigationList.map((item) => (
                          <a key={item.name} onClick={() => handleRoute(item.name, item.href)}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(item.current ? 'underline underline-offset-4 text-blue-500' : 'text-gray-300 hover:text-blue-200', 'rounded-md px-3 py-2 text-sm font-medium cursor-pointer')}
                          >{item.name}</a>
                        ))}
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-100 hover:text-white"
                          onClick={handleLoginIn}
                        >Log in <span aria-hidden="true">&rarr;</span></a>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      <Disclosure.Button
                        className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      >
                        {(isMobileMenuOpen) ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Transition
                  show={isMobileMenuOpen}
                  enter="transform transition duration-300 ease-in-out origin-right"
                  enterFrom="translate-x-full opacity-0"
                  enterTo="translate-x-0 opacity-100"
                  leave="transform transition duration-300 ease-in-out origin-right"
                  leaveFrom="translate-x-0 opacity-100"
                  leaveTo="translate-x-full opacity-0"
                >
                  {(ref) => (
                    <div ref={ref} className="md:hidden absolute top-0 right-0 h-full bg-gray-800 w-64 z-20">
                      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-gray-800">
                        {navigationList.map((item) => (
                          <Disclosure.Button key={item.name} as="a" onClick={() => handleRoute(item.name, item.href)}
                            className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium cursor-pointer'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          > {item.name} </Disclosure.Button>
                        ))}
                        <a className='block rounded-md px-3 py-2 text-base font-medium cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white'
                          onClick={handleLoginIn}
                        >Log in <span aria-hidden="true">&rarr;</span></a>

                      </div>
                    </div>
                  )}
                </Transition>
              </>
            )}
          </Disclosure>
        </div>

        {/* <div>{children}</div> */}
      </div>
    </>
  );
}

export default Header