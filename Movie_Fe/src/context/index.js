import { createContext, useState } from 'react';
import './contex.scss';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [role,setRole]= useState(false)

    const showToastMessage = (feat, content) => {
        toast[feat](`${content}`, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message',
            autoClose: 2500,
        });
    };

    return <AuthContext.Provider value={{ showToastMessage, role, setRole }}>{children}</AuthContext.Provider>;
};
