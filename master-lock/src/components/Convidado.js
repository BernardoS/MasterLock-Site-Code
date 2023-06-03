import React from "react";
import { FaUser } from "react-icons/fa";

export default function Convidado({idConvidado,emailConvidado,nomeConvidado}){

    return(
        <div className="row item-fechadura rounded m-3"  >
           <div className="col-2 d-flex align-items-center">
                <FaUser className="circle-disabled"/>
           </div>
           <div className="col-10 py-3">
                <p>Id: {idConvidado}</p>
                <p>Email: {emailConvidado}</p>
                <p>Nome: {nomeConvidado} </p>
           </div>
        </div>
        
    );
}