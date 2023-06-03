import React, { useEffect, useState } from "react";
import TopBar from "../../../components/TopBar";
import { useNavigate, useParams } from "react-router-dom";
import {Swal} from "sweetalert2";
import { recuperarInformacoesDaFechadura } from '../../../services/API/api';
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import { FaList, FaUserLock } from "react-icons/fa";

export default function DetalheFechadura(){

    const auth = useAuth();

    const { idFechadura } = useParams();

    const [nomeFechadura,setNomeFechadura] = useState();
    const [nomeAmbiente,setNomeAmbiente] = useState();

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

    useEffect(()=>{ 
        const recuperarInformacoes = async()=>{
            const fechaduraRequest = await recuperarInformacoesDaFechadura(idFechadura);
    
            setNomeAmbiente(fechaduraRequest.data.NomeAmbiente);
            setNomeFechadura(fechaduraRequest.data.Nome);
        }

        recuperarInformacoes()
    },[idFechadura]);

    

    const navigate = useNavigate();

    return(
        <>
            <TopBar icon="door">
                Detalhe da Fechadura
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Visualizar detalhes da fechadura {idFechadura}
                    </h2>
                    <p className="text-break p-2">
                        Nesta tela é possível visualizar os detalhes da fechadura. E também acessar o histórico e as permissões da mesma.
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row justify-content-around p-3">
                    <form>

                        <header className="d-flex justify-content-around row">
                            <button type="button" onClick={()=> navigate("/dashboard/historico-fechadura/"+idFechadura)} className='header-button col-5 d-flex justify-content-center align-items-center'> <FaList className="mx-3"/> Visualizar histórico</button>
                            <button type="button" onClick={()=> navigate("/dashboard/permissoes/fechadura/"+idFechadura)} className='header-button col-5 d-flex justify-content-center align-items-center'> <FaUserLock className="mx-3"/> Visualizar permissões</button>
                        </header>

                        <div className="row mx-2">
                            <label htmlFor="idFechadura" className='default-input-label'>
                                Id da Fechadura
                            </label>
                            <input type="text" name="idFechadura" value={idFechadura} readOnly={true} className='default-input col' />
                        </div>
                        <div className="row mx-2">
                            <label htmlFor="nomeFechadura" className='default-input-label'>
                                Nome da Fechadura
                            </label>
                            <input type="text" name="nomeFechadura" value={nomeFechadura} readOnly={true} className='default-input col' />
                        </div>
                        <div className="row mx-2">
                            <label htmlFor="ambient" className='default-input-label'>
                                Nome do Ambiente
                            </label>
                            <input type="text" name="ambient" value={nomeAmbiente} readOnly={true} className='default-input col' />
                        </div>
                       
                
                        <div className="col-12 mx-2">
                            <div className="open-lock-button-container">
                                <button onClick={()=>abrirFechadura()} className="open-lock-button">SolicitarAbertura</button>
                            </div>    
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
        
    );
}