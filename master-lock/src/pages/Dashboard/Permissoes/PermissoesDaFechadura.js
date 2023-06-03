import React, {useState,useEffect}from "react";
import TopBar from "../../../components/TopBar";
import Permissao from "../../../components/Permissao";
import { useParams } from 'react-router-dom';
import { recuperarPermissoesDaFechadura } from '../../../services/API/api';


export default function PermissoesDaFechadura(){

    const { idFechadura } = useParams();

    const [permissoesDaFechadura,setPermissoesDaFechadura] = useState([]);
    const [permissoesComponentes,setPermissoesComponentes] = useState();

    useEffect(()=>{ 
        const recuperarInformacoes = async()=>{
            const permissoesRequest = await recuperarPermissoesDaFechadura(idFechadura);
    
            setPermissoesDaFechadura(permissoesRequest.data);
        }

        recuperarInformacoes();
        
    },[idFechadura]);


    useEffect(()=>{
        setPermissoesComponentes(permissoesDaFechadura.map((permissao) =>  <Permissao key={permissao.Id} idFechadura={permissao.IdFechadura} idUsuario={permissao.Idusuario} tipoEntrada={permissao.TipoEntrada}/>));
    },[permissoesDaFechadura]);

    return(
        <>
            <TopBar icon="user-lock">
                Gerenciamento de permissões da Fechadura
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Painel de controle das permissões
                    </h2>
                    <p className="text-break p-2">
                        Nesta tela é possível ver todas as permissões vinculadas a fechadura: {idFechadura}
                    </p>
                </div>
                <div className="dashboard-content-body">

                    <div className="row justify-content-around px-5">
                    {permissoesDaFechadura != null && permissoesComponentes}
                    </div>
                </div>
            </div>
        </>
        
    );
}