import React, { useEffect, useState } from "react";
import Ambiente from "../../../components/Ambiente";
import TopBar from "../../../components/TopBar";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import { recuperarAmbientesDoUsuario } from "../../../services/API/api";

export default function Ambientes(){

    const [ambientesDoUsuario,setAmbientesDoUsuario] = useState([]);
    const [ambientesComponentes,setAmbientesComponentes] = useState();
    const auth = useAuth();


    useEffect(()=>{ 
        const recuperarInformacoes = async()=>{
            const ambientesRequest = await recuperarAmbientesDoUsuario(auth.Id);
    
            setAmbientesDoUsuario(ambientesRequest.data);
        }

        recuperarInformacoes();
    },[auth.Id]);


    useEffect(()=>{
        setAmbientesComponentes(ambientesDoUsuario.map((ambiente) =>  <Ambiente nomeAmbiente={ambiente.NomeAmbiente} idAdmin={ambiente.IdAdmin} idAmbiente={ambiente.Id}/> ));
    },[ambientesDoUsuario]);


    return(
        <>
            <TopBar icon="lock">
                Controle de Ambiente
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Painel de controle de ambientes
                    </h2>
                    <p className="text-break p-2">
                        Estes são os ambientes que você tem acesso dentro do sistema. Dentro de cada ambiente existe um grupo de fechaduras, para visualizar as fechaduras vinculadas, basta clicar no ícone do ambiente.
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row justify-content-around px-5">
                        {ambientesDoUsuario != null && ambientesComponentes}
                    </div>
                </div>
            </div>
        </>
        
    );
}