import React,{useState} from "react";
import TopBar from "../../../components/TopBar";
import { useNavigate } from "react-router-dom";
import { criarPermissao } from '../../../services/API/api';
import { FaUserLock } from "react-icons/fa";
import Swal from "sweetalert2";


export default function CriarPermissao(){

    const navigate = useNavigate();

    const [idFechadura,setIdFechadura] = useState();
    const [idUsuario,setIdUsuario] = useState();
    const [tipoEntrada,setTipoEntrada] = useState("RFID");
    const [codigoPermissao,setCodigoPermissao] = useState();

    const handleIdFechadura = (event) =>{
        setIdFechadura(event.target.value);
    }

    const handleIdUsuario = (event) => {
        setIdUsuario(event.target.value);
    }
   
    const handleTipoEntrada = (event) =>{
        setTipoEntrada(event.target.value);
    }

    const handleCodigoPermissao = (event) => {
        setCodigoPermissao(event.target.value);
    }

    async function criarPermissaoDaFechadura(){
        
        const permissaoData = {idFechadura,idUsuario,tipoEntrada,codigoPermissao}

        Swal.fire({
            title: 'Você tem certeza?',
            text: "O usuário associado poderá acessar o ambiente através da fechadura associada ao você criar esta permissão!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16D5A6',
            cancelButtonColor: '#45454C',
            confirmButtonText: 'Sim, criar permissão!',
            cancelButtonText:'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.showLoading();
                try {
                    await criarPermissao(permissaoData);
                    Swal.close();
                    Swal.fire(
                        'Permissão Criada',
                        'A permissão de acesso foi criada com sucesso',
                        'success'
                    );
                    navigate("/dashboard/permissoes");
                } catch (error) {
                    Swal.close();
                    console.log(error);
                    Swal.fire(
                        'Erro ao criar permisssão',
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
                Detalhe da Permissão
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Criar nova permissão
                    </h2>
                    <p className="text-break p-2">
                        Nesta tela é possível criar uma nova permissão associando um convidado a fechadura
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row justify-content-around p-3">
                    <form>
                        <div className="row mx-2">
                            <label htmlFor="idFechadura" className='default-input-label'>
                                Id da fechadura
                            </label>
                            <input type="text" name="idFechadura" value={idFechadura} onChange={handleIdFechadura} className='default-input col' />
                        </div>
                        <div className="row mx-2">
                            <label htmlFor="idUsuario" className='default-input-label'>
                                Id do usuário
                            </label>
                            <input type="text" name="idUsuario" value={idUsuario} onChange={handleIdUsuario} className='default-input col' />
                        </div>
                        <div className="row mx-2">
                            <div className="col">
                                <label htmlFor="tipoEntrada" className='default-input-label'>
                                    Tipo de entrada
                                </label>
                                <select name="tipoEntrada" id="tipoEntrada" onChange={handleTipoEntrada}  className='default-input'>
                                    <option value="RFID" selected >Cartão RFID</option>
                                    <option value="SenhaNumerica">Senha numérica</option>
                                    <option value="ImpressaoDigital">Impressão digital</option>
                                    <option value="Email">E-Mail</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="tipoEntrada" className='default-input-label'>
                                    Código de Permissão
                                </label>
                                <input type="text" name="codigoPermissao" value={codigoPermissao}  onChange={handleCodigoPermissao} className='default-input' />
                            </div>
                        </div>
                        <footer className="d-flex justify-content-around row mx-2">
                            <button type="button" onClick={()=> criarPermissaoDaFechadura()} className='header-button col d-flex justify-content-center align-items-center'> <FaUserLock className="mx-3"/>Criar permissão</button>
                        </footer>

                    </form>
                    </div>
                </div>
            </div>
        </>
        
    );
} 