import React,{useEffect, useState} from "react";
import TopBar from "../../../components/TopBar";
import { useParams, useNavigate } from "react-router-dom";
import {recuperarInformacoesDaPermissao, apagarPermissao} from '../../../services/API/api';
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


export default function DetalhePermissao(){

    const navigate = useNavigate();

    const { idPermissao } = useParams();
    const [idFechadura,setIdFechadura] = useState();
    const [idUsuario,setIdUsuario] = useState();
    const [tipoEntrada,setTipoEntrada] = useState();
    const [codigoPermissao,setCodigoPermissao] = useState();

    useEffect(()=>{ 
        const recuperarInformacoes = async()=>{
            const fechaduraRequest = await recuperarInformacoesDaPermissao(idPermissao);
    
            setIdFechadura(fechaduraRequest.data.IdFechadura);
            setIdUsuario(fechaduraRequest.data.Idusuario);
            setTipoEntrada(fechaduraRequest.data.TipoEntrada);
            setCodigoPermissao(fechaduraRequest.data.CodigoPermissao);
        }

        recuperarInformacoes()
    },[idPermissao]);


    async function apagarPermissaoDoUsuario(idPermissao){
        
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não será capaz de reverter esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16D5A6',
            cancelButtonColor: '#45454C',
            confirmButtonText: 'Sim, apagar permissão!',
            cancelButtonText:'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.showLoading();
                try {
                    await apagarPermissao(idPermissao);
                    Swal.close();
                    Swal.fire(
                        'Permissão apagada',
                        'A permissão de acesso foi apagada com sucesso',
                        'success'
                    );
                    navigate("/dashboard/permissoes");
                } catch (error) {
                    Swal.close();
                    console.log(error);
                    Swal.fire(
                        'Erro ao apagar permisssão',
                        'Houve algum erro na requisição para apagar a permissão',
                        'error'
                    );
                }
                
            }
          })
    }

    return(
        <>
            <TopBar icon="user-lock">
                Detalhe da Permissão
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Visualizar detalhes da Permissão
                    </h2>
                    <p className="text-break p-2">
                        Nesta tela é possível visualizar os detalhes da permissão de um usuário.
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row justify-content-around p-3">
                    <form>

                        <header className="d-flex justify-content-around row mx-2">
                            <button type="button" onClick={()=> apagarPermissaoDoUsuario(idPermissao)} className='header-button col d-flex justify-content-center align-items-center'> <FaTrash className="mx-3"/>Apagar permissão</button>
                        </header>

                        <div className="row mx-2">
                            <label htmlFor="idPermissao" className='default-input-label'>
                                Id da permissão
                            </label>
                            <input type="text" name="idPermissao" value={idPermissao} readOnly={true} className='default-input col' />
                        </div>
                        <div className="row mx-2">
                            <label htmlFor="idFechadura" className='default-input-label'>
                                Id da fechadura
                            </label>
                            <input type="text" name="idFechadura" value={idFechadura} readOnly={true} className='default-input col' />
                        </div>
                        <div className="row mx-2">
                            <label htmlFor="idUsuario" className='default-input-label'>
                                Id do usuário
                            </label>
                            <input type="text" name="idUsuario" value={idUsuario} readOnly={true} className='default-input col' />
                        </div>
                        <div className="row mx-2">
                            <div className="col">
                                <label htmlFor="tipoEntrada" className='default-input-label'>
                                    Tipo de entrada
                                </label>
                                <input type="text" name="tipoEntrada" value={tipoEntrada} readOnly={true} className='default-input' />
                            </div>
                            <div className="col">
                                <label htmlFor="tipoEntrada" className='default-input-label'>
                                    Código de Permissão
                                </label>
                                <input type="text" name="codigoPermissao" value={codigoPermissao} readOnly={true} className='default-input' />
                            </div>
                            
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
        
    );
} 