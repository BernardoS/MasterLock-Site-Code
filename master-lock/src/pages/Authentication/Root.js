import React from 'react';
import logo from  '../../images/master-lock-logo.png';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function ForgotPassword(){
    
    const navigate =  useNavigate();

    return(
        <div className="external-container">
            <img src={logo} alt="Master Lock Logo" className="main-logo" onClick={()=>navigate("/")}/>
            <Outlet/>
        </div>
    );
}