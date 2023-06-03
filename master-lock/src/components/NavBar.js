import React, { useEffect } from "react";
import logo from  '../images/master-lock-logo.png';
import { useNavigate, useLocation } from "react-router-dom";
import { FaDoorOpen, FaLock, FaUserLock } from "react-icons/fa";
import {useAuth} from '../contexts/AuthContext/useAuth';


export default function Navbar(){

    const auth = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const baseLocation = location.pathname.split('/dashboard')[1];

    const activeClasses = "row nav-button nav-button-active align-items-center";
    const disabledClasses = "row nav-button align-items-center";

    const lockRoutes = [''];
    const ambientRoutes = ['/ambientes'];
    const permissionRoutes = ['/permissoes'];
    
    useEffect(()=>
    {

    },[location]);
    

    return(
        <div className="dashboard-nav-bar">
            <header className="row justify-content-center mb-2">
                    <img src={logo} alt="Master Lock Logo"  className="col-10"/>
            </header>
            {auth.isAdmin&&<h3 className="row justify-content-center mb-3">Operador</h3>}
            <button onClick={()=>navigate('/dashboard')} className={lockRoutes.includes(baseLocation)===true?activeClasses:disabledClasses} >
                <FaDoorOpen className="col-3"/>
                <span className="col-8">Fechaduras</span>
            </button>
            <button onClick={()=>navigate('/dashboard/ambientes')} className={ambientRoutes.includes(baseLocation)===true?activeClasses:disabledClasses}>
                <FaLock className="col-3"/>
                <span className="col-8">Ambientes</span>
            </button>
            <button onClick={()=>navigate('/dashboard/permissoes')} className={permissionRoutes.includes(baseLocation)===true?activeClasses:disabledClasses}>
                <FaUserLock className="col-3"/>
                <span className="col-8">Permissões</span>
            </button>
        </div>
    );
}