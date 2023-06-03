import React , {createContext, useEffect, useState} from 'react';
import { getUserLocalStorage, setUserLocalStorage } from './util';
import { logarUsuario } from '../../services/Firebase';
import { recuperarInformacoesDoUsuario, verificarSeUsuarioEhAdmin } from '../../services/API/api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState();

    useEffect(()=>{
        const user = getUserLocalStorage();

        if(user){
            setUser(user);
        }
    },[])

    async function authenticate (email,password){
        const response = await logarUsuario(email,password);
        const userInfoRequest = await recuperarInformacoesDoUsuario(email);
        const usuarioEhAdminRequest = await verificarSeUsuarioEhAdmin(userInfoRequest.data.Id);

        const payload = {token: response.accessToken, email, Id: userInfoRequest.data.Id , isAdmin: usuarioEhAdminRequest.data.isAdmin};

        setUser(payload);
        setUserLocalStorage(payload);
    }

    function logout(){
        setUser(null);
        setUserLocalStorage(null);
    }

    return(
        <AuthContext.Provider value={{...user,authenticate,logout}}>
            {children}
        </AuthContext.Provider>
    );

}