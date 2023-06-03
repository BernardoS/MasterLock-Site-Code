import React,{useEffect,useState} from "react";
import TopBar from "../../../components/TopBar";
import { useParams } from "react-router-dom";
import { recuperarHistoricoDeFechadura } from '../../../services/API/api';

import Historico from "../../../components/Historico";

export default function HistoricoFechadura(){

    const { idFechadura } = useParams();

    const [historicosDaFechadura,setHistoricosDaFechadura] = useState([]);
    const [historicosComponentes,setHistoricosComponentes] = useState();

    useEffect(()=>{ 
        const recuperarInformacoes = async()=>{
            const historicosFechaduraRequest = await recuperarHistoricoDeFechadura(idFechadura);
    
            setHistoricosDaFechadura(historicosFechaduraRequest.data);
        }

        recuperarInformacoes();
        
    },[idFechadura]);


    useEffect(()=>{
        setHistoricosComponentes(historicosDaFechadura.map((historico) =>  <Historico idHistorico={historico.Id} horario={historico.Horario} operacao={historico.Operacao} idUsuario={historico.Usuario} />));
    },[historicosDaFechadura]);


    return(
        <>
            <TopBar icon="door">
                Histórico da Fechadura
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Visualizar histórico da fechadura {idFechadura}
                    </h2>
                    <p className="text-break p-2">
                        Nesta tela é possível visualizar o histórico de acesso da fechadura.
                    </p>
                </div>
                <div className="dashboard-content-body container p-3">
                    {historicosDaFechadura.length > 0 && historicosComponentes}
                </div>
            </div>
        </>
        
    );
}