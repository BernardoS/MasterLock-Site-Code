import React from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Ambiente({idAmbiente,nomeAmbiente,idAdmin}){

    const navigate = useNavigate();

    return(
        <div className="row item-fechadura rounded m-3" onClick={()=>navigate('/dashboard/fechadura/ambiente/'+idAmbiente)} >
           <div className="col-2 d-flex align-items-center">
                <FaLock className="circle-disabled"/>
           </div>
           <div className="col-10 py-3">
                <p>Ambiente: {nomeAmbiente}</p>
                <p>Id:{idAmbiente}</p>
                <p>Id do Admin: {idAdmin}</p>
           </div>
        </div>
        
    );
}