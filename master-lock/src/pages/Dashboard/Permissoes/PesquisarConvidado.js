import React,{useState,useEffect} from "react";
import TopBar from "../../../components/TopBar";
import { pesquisarConvidado } from '../../../services/API/api';
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import Convidado from "../../../components/Convidado";


export default function PesquisarConvidado(){


    const [criterioPesquisa,setCriterioPesquisa] = useState("RFID");
    const [textoPesquisa,setTextoPesquisa] = useState();
    const [convidado,setConvidado] = useState(null);


    const handleCriterioPesquisa = (event) =>{
        setCriterioPesquisa(event.target.value);
    }
    const handleTextoPesquisa = (event) =>{
        setTextoPesquisa(event.target.value);
    }

    async function pesquisarConvidadoDaPlataforma(){
        
        const pesquisaData = {textoPesquisa,criterioPesquisa};

        Swal.showLoading();

        try {
            Swal.close();
            const requestData = await pesquisarConvidado(pesquisaData);
            await setConvidado(requestData.data);
            console.log(requestData.data);
            Swal.fire({
                icon: 'success',
                title: 'A pesquisa retornou resultado',
                text: "Pesquisa realizada com sucesso"
            });
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'A pesquisa não retornou resultado',
                text: "A pesquisa não foi realizada com sucesso"
            });
        }

    }

    useEffect(()=>{
        console.log(convidado);
    },[convidado]);

    return(
        <>
            <TopBar icon="user-lock">
                Detalhe da Permissão
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Pesquisar convidado
                    </h2>
                    <p className="text-break p-2">
                        Nesta tela é possível pesquisar os convidados cadastrados na base de dados através do email ou do Id.
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row justify-content-around p-3">
                    <form>
                        <div className="row mx-2 d-flex justify-content-center align-items-center">
                            <div className="col">
                                <label htmlFor="crietrioPesquisa" className='default-input-label'>
                                    Critério de pesquisa
                                </label>
                                <select name="crietrioPesquisa" id="crietrioPesquisa" onChange={handleCriterioPesquisa}  className='default-input'>
                                    <option value="Id" selected>Id do usuário</option>
                                    <option value="Email">E-mail</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="tipoEntrada" className='default-input-label'>
                                    Pesquisa
                                </label>
                                <input type="text" name="codigoPermissao" value={textoPesquisa}  onChange={handleTextoPesquisa} className='default-input' />
                            </div>
                            <button type="button" onClick={()=> pesquisarConvidadoDaPlataforma()} className='header-button col d-flex justify-content-center align-items-center mt-4'> <FaSearch className="mx-3"/></button>
                        </div>
                    </form>
                    <div className="row justify-content-around px-5">
                        {convidado != null && <Convidado idConvidado={convidado.Id} nomeConvidado={convidado.Nome} emailConvidado={convidado.Email}/>}
                    </div>
                    </div>
                </div>
            </div>
        </>
        
    );
} 