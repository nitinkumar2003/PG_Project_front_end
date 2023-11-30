import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHomeType, fetchLivingType, fetchSharingType, fetchPriceType, fetchPropertyList } from '../features/masterApi/masterApiSlice'
import useSessionStorage from '../hooks/useSessionStorage';
import useCustomDispatchHook from '../hooks/useCustomDispatchHook';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoginOrNotDispatch } = useCustomDispatchHook()
  const [isApiCall, setIsApiCall] = useState(false)


  useEffect(() => {
    if (isApiCall == true) return;
    dispatch(fetchHomeType());
    dispatch(fetchLivingType());
    dispatch(fetchSharingType());
    dispatch(fetchPriceType());
    dispatch(fetchPropertyList());
    setIsApiCall(true)
  }, [dispatch]);
  useEffect(() => {
    const authTokenazs = sessionStorage.getItem('authToken')
    if (authTokenazs) {
      isLoginOrNotDispatch(true)
    } else {
      isLoginOrNotDispatch(false)
    }
  }, [])

  return <>{children}</>;
};

export default Layout;
