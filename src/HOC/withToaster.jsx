import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const withToaster = (Component) => {
  return function WithToaster(props) {
    const showToast = (type,message) => {
      toast[type](message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: { top: 0, right: 0,  zIndex: 999999999}
      });
    }
    return (
      <>
        <ToastContainer style={{zIndex:999999999}} />
        <Component showToast={showToast} {...props} />
      </>
    )
  }
}

export default withToaster