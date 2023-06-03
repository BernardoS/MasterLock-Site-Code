import React from "react";
import { FaCog,FaDoorClosed,FaDoorOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext/useAuth";

export default function Fechadura({idFechadura,estaAberta,nomeAmbiente,nomeFechadura}){

    const auth = useAuth();
    const navigate = useNavigate();

    function abrirFechadura(){

        Swal.showLoading();

        const dadosFechadura = {
            idFechadura, 
            email:auth.email,
        }

        axios.post('http://localhost:8080/permissoes/solicitar-entrada/email', dadosFechadura)
          .then(function (response) {
            console.log(response);
            Swal.close();
            const {success, message} = response.data;
            if(success === true){
                Swal.fire({
                    icon: 'success',
                    title: 'Solicitação realizada com sucesso',
                    text: message
                  });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Solicitação recusada',
                    text: message
                  });
            }
          })
          .catch(function (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Erro na solicitação',
                text: "Houve algum erro no envio ou processamento da sua solicitação"
              });
          });

    }

    return(
        <div className="lock-container-small col-3 mx-4 my-2 py-2">
            <header className="row">
                <div className="col-8">
                    <p>
                        <b>Ambiente: {nomeAmbiente}</b>  <br/>
                        <i>Fechadura: {nomeFechadura}</i>
                    </p>
                </div>
                <div onClick={()=>navigate('/dashboard/detalhe-fechadura/'+idFechadura)} className="lock-container-cog-icon col-4">
                    <FaCog/>
                </div>
            </header>
            <div className="row lock-container-door-icon mt-5">
                {estaAberta === "true" ?<FaDoorOpen/>:<FaDoorClosed/>}
            </div>
            <div className="open-lock-button-container">
                <button onClick={()=>abrirFechadura()} disabled={estaAberta === "true"?true:false} className="open-lock-button">{estaAberta === "true"?"Aguarde ...":"Abrir"}</button>
            </div>
            
           
        </div>
        
    );
}