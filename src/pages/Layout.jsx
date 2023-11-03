import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHomeType, fetchLivingType, fetchSharingType, fetchPriceType } from '../features/masterApi/masterApiSlice'
import useSessionStorage from '../hooks/useSessionStorage';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [isApiCall, setIsApiCall] = useState(false)
  

  useEffect(() => {
    if (isApiCall == true) return;
    dispatch(fetchHomeType());
    dispatch(fetchLivingType());
    dispatch(fetchSharingType());
    dispatch(fetchPriceType());
    setIsApiCall(true)
  }, [dispatch]);

  return <>{children}</>;
};

export default Layout;
