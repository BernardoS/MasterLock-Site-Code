import React,{ useState } from "react";
import TopBar from "../../../components/TopBar";
import { useNavigate } from "react-router-dom";
import { criarConvidado } from '../../../services/API/api';
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";


export default function CriarUsuarioConvidado(){

    const navigate = useNavigate();

    const [emailUsuario,setEmailUsuario] = useState();
    const [nomeUsuario,setNomeUsuario] = useState();
    
    const handleEmailUsuario = (event) => {
        setEmailUsuario(event.target.value);
    }
    
    const handleNomeUsuario = (event) => {
        setNomeUsuario(event.target.value);
    }

    async function criarConvidadoDaPlataforma(){
        
        const convidadoData = {emailUsuario,nomeUsuario}

        Swal.fire({
            title: 'Você tem certeza?',
            text: "Ao cadastrar o convidado você permitirá a criação de permissões de acesso para o mesmo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16D5A6',
            cancelButtonColor: '#45454C',
            confirmButtonText: 'Sim, cadastrar convidado!',
            cancelButtonText:'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.showLoading();
                try {
                    await criarConvidado(convidadoData);
                    Swal.close();
                    Swal.fire(
                        'Convidado Cadastrado',
                        'O convidado foi cadastrado com sucesso',
                        'success'
                    );
                    navigate("/dashboard/permissoes");
                } catch (error) {
                    Swal.close();
                    console.log(error);
                    Swal.fire(
                        'Erro ao cadastrar o usuário',
                        'Houve algum erro na requisição para criar a permissão',
                        'error'
                    );
                }
                
            }
          })
    }

    return(
        <>
            <TopBar icon="user-lock">
                Cadastrar usuário convidado
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Cadastrar novo convidado
                    </h2>
                    <p className="text-break p-2">
                        Nesta tela é possível cadastrar um novo convidado para depois associá-lo à fechadura.
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row justify-content-around p-3">
                    <form>
                        <div className="row mx-2">
                            <label htmlFor="idUsuario" className='default-input-label'>
                                Email
                            </label>
                            <input type="text" name="idUsuario" value={emailUsuario} onChange={handleEmailUsuario} className='default-input col' />
                        </div>
                        <div className="row mx-2">
                            <label htmlFor="idUsuario" className='default-input-label'>
                                Nome do convidado
                            </label>
                            <input type="text" name="idUsuario" value={nomeUsuario} onChange={handleNomeUsuario} className='default-input col' />
                        </div>

                        <footer className="d-flex justify-content-around row mx-2">
                            <button type="button" onClick={()=> criarConvidadoDaPlataforma()} className='header-button col d-flex justify-content-center align-items-center'> <FaUserPlus className="mx-3"/>Cadastrar convidado</button>
                        </footer>

                    </form>
                    </div>
                </div>
            </div>
        </>
        
    );
} 