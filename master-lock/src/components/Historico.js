import React from "react";
import { FaCircle } from "react-icons/fa";

export default function Historico({idHistorico,horario,idUsuario,operacao}){

    var isBlocked = operacao.includes("Abertura bloqueada");

    return(
        
        <div className="row item-historico rounded m-3 ">
           <div className="col-2 d-flex align-items-center justify-content-center">
                <FaCircle className={isBlocked?"circle-disabled":"circle-active"}/>
           </div>
           <div className="col-10 py-3">
                <p className={!isBlocked&&"text-active"} ><b>{idHistorico}</b></p>
                <p className={!isBlocked&&"text-active"}>Operação:<b>{operacao}</b></p>
                <p className={!isBlocked&&"text-active"}>Horário: {horario}</p>
                {!isBlocked?
                    <p className="text-active">Id do Convidado: {idUsuario}</p>
                    :
                    <p>Credencial recusada: {idUsuario}</p>
                    }
                
           </div>
        </div>
        
    );
}