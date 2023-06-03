import React from "react";
import { FaDoorClosed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FechaduraListItem({idFechadura}){

    const navigate = useNavigate();


    return(
        <div className="row item-fechadura rounded m-3" onClick={()=>{navigate("/")}}>
           <div className="col-2 d-flex align-items-center">
                <FaDoorClosed className="circle-disabled"/>
           </div>
           <div className="col-10 py-3">
                <p>Porta: sefhsdfbhuj-sdkjfbsdjbf-213234</p>
                <p>Ativada</p>
           </div>
        </div>
        
    );
}