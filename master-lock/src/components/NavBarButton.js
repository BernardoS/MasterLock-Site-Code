import React from "react";
import { useNavigation } from "react-router-dom";

export default function NavBarButton({route,isActive,children}){

    const navigate = useNavigation();

    if(isActive){
        return(
            <button onClick={()=>navigate(route)} className="row nav-button align-items-center" ></button>
        );
    }
}