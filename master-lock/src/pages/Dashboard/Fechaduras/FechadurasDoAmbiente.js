import React, { useEffect, useState } from "react";
import Fechadura from "../../../components/Fechadura";
import TopBar from "../../../components/TopBar";
import { useParams } from 'react-router-dom';
import { recuperarFechadurasDoAmbiente } from '../../../services/API/api';


export default function FechadurasDoAmbiente(){

    const { idAmbiente } = useParams();

    const [fechadurasDoAmbiente,setFechadurasDoAmbiente] = useState([]);
    const [fechadurasComponentes,setFechadurasComponentes] = useState();
    
    useEffect(()=>{ 
        const recuperarInformacoes = async()=>{
            const fechadurasRequest = await recuperarFechadurasDoAmbiente(idAmbiente);
    
            setFechadurasDoAmbiente(fechadurasRequest.data);
        }

        recuperarInformacoes();
        
    },[idAmbiente]);


    useEffect(()=>{
        setFechadurasComponentes(fechadurasDoAmbiente.map((fechadura) => <Fechadura key={fechadura.Id} idFechadura={fechadura.Id} nomeFechadura={fechadura.Nome} nomeAmbiente={fechadura.NomeAmbiente} estaAberta={fechadura.EstaAberta}/> ));
    },[fechadurasDoAmbiente]);

    return(
        <>
            <TopBar icon="door">
                Controle das Fechaduras do Ambiente
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Painel de controle de fechaduras do ambiente
                    </h2>
                    <p className="text-break p-2">
                        Estas são as fechaduras do ambiente selecionado.
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row p-3">
                        {fechadurasDoAmbiente != null && fechadurasComponentes}
                    </div>
                </div>
            </div>
        </>
        
    );
}