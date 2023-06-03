import React from "react";
import { FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Permissao({idPermissao,idUsuario,idFechadura,tipoEntrada}){

    const navigate = useNavigate();


    return(
        <div className="row item-fechadura rounded m-3" onClick={()=>{navigate("/dashboard/detalhe-permissoes/"+idPermissao)}}>
           <div className="col-2 d-flex align-items-center">
                <FaUserLock className="circle-disabled"/>
           </div>
           <div className="col-10 py-3">
                <p>Id do Usuário: {idUsuario}</p>
                <p>Id da Fechadura: {idFechadura}</p>
                <p>Tipo: {tipoEntrada}</p>
           </div>
        </div>
        
    );
}