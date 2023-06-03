import React from "react";
import { FaDoorOpen, FaLock, FaUserLock, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/useAuth";


export default function TopBar({icon,children}){

    const auth = useAuth();

    const navigate = useNavigate();

    function SignOut(){
        auth.logout();
        navigate('/')
    }

    return(
        <div className="dashboard-top-bar">
            {icon==="door"&&<FaDoorOpen/>}
            {icon==="lock"&&<FaLock/>}
            {icon==="user-lock"&&<FaUserLock/>}
            <span>{children}</span>
            <div onClick={()=>SignOut()} className="sign-out-button">
                <FaSignOutAlt/>
            </div>
        </div>
    );
}