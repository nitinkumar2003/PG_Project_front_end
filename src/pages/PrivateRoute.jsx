import React, { useEffect } from 'react';
import useSessionStorage from '../hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';
import { actionOfLoginForm } from '../utilities/utilities';
import { useLoginFormStatus, useCustomDispatch } from '../hooks/useLoginFormStatus';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const customDispatch=useCustomDispatch()
    const [AuthToken] = useSessionStorage('authToken', '');
    const authed = (AuthToken !== '' && AuthToken !== null);

    useEffect(() => {
        if (!authed) {
            navigate('/');
            customDispatch(actionOfLoginForm[0])
        }
    }, [authed, navigate]);

    return authed ? children : null;
};

export default PrivateRoute;
