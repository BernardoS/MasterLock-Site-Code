import React, {useState,useEffect}from "react";
import TopBar from "../../../components/TopBar";
import Permissao from "../../../components/Permissao";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import { recuperarPermissoesDoUsuario } from '../../../services/API/api';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserLock, FaUserPlus } from "react-icons/fa";

export default function Permissoes(){

    const navigate = useNavigate();

    const [permissoesDoUsuario,setPermissoesDoUsuario] = useState([]);
    const [permissoesComponentes,setPermissoesComponentes] = useState();
    const auth = useAuth();

    useEffect(()=>{ 
        const recuperarInformacoes = async()=>{
            const permissoesRequest = await recuperarPermissoesDoUsuario(auth.Id);
    
            setPermissoesDoUsuario(permissoesRequest.data);
        }

        recuperarInformacoes();
        
    },[auth.Id]);


    useEffect(()=>{
        setPermissoesComponentes(permissoesDoUsuario.map((permissao) =>  <Permissao key={permissao.Id} idPermissao={permissao.Id} idFechadura={permissao.IdFechadura} idUsuario={permissao.Idusuario} tipoEntrada={permissao.TipoEntrada}/>));
    },[permissoesDoUsuario]);


    return(
        <>
            <TopBar icon="user-lock">
                Gerenciamento de permissões
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Painel de controle das permissões
                    </h2>
                    <p className="text-break p-2">
                        Nesta tela é possível ver todas as permissões vinculadas aos ambientes ao qual você gerencia
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row  d-flexjustify-content-around p-3 mx-2">
                        <button type="button" onClick={()=> navigate("/dashboard/permissoes/pesquisar-convidado")} className='header-button col d-flex justify-content-center align-items-center m-2'> <FaSearch className="mx-3"/>Pesquisar convidado</button>
                    </div>
                    <div className="row  d-flexjustify-content-around p-3 mx-2">
                        <button type="button" onClick={()=> navigate("/dashboard/permissoes/criar")} className='header-button col d-flex justify-content-center align-items-center m-2'> <FaUserLock className="mx-3"/>Criar permissão</button>
                        <button type="button" onClick={()=> navigate("/dashboard/permissoes/criar-convidado")} className='header-button col d-flex justify-content-center align-items-center m-2'> <FaUserPlus className="mx-3"/>Cadastrar convidado</button>
                    </div>
                    <div className="row justify-content-around px-5">
                        {permissoesDoUsuario != null && permissoesComponentes}
                    </div>
                </div>
            </div>
        </>
        
    );
}