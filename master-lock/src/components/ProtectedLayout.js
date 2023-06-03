import React from 'react';
import {useAuth} from '../contexts/AuthContext/useAuth';

export const ProtectedLayout = ({children}) =>{
    const auth = useAuth();

    if(!auth.email){
        return <h1> Você não tem acesso!</h1>
    }

    return children;
}