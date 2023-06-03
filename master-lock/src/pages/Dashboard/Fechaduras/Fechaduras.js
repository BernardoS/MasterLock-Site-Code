import React, { useEffect, useState } from "react";
import Fechadura from "../../../components/Fechadura";
import TopBar from "../../../components/TopBar";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import { recuperarFechadurasDoUsuario } from "../../../services/API/api";


export default function Fechaduras(){

    const [fechadurasDoUsuario,setFechadurasDoUsuario] = useState([]);
    const [fechadurasComponentes,setFechadurasComponentes] = useState();
    const auth = useAuth();

    useEffect(()=>{ 
        const recuperarInformacoes = async()=>{
            const fechadurasRequest = await recuperarFechadurasDoUsuario(auth.Id);
    
            setFechadurasDoUsuario(fechadurasRequest.data.listaDeFechaduras);
        }

        recuperarInformacoes();
    },[auth.Id]);


    useEffect(()=>{
        setFechadurasComponentes(fechadurasDoUsuario.map((fechadura) => <Fechadura key={fechadura.Id} idFechadura={fechadura.Id} nomeFechadura={fechadura.Nome} nomeAmbiente={fechadura.NomeAmbiente} estaAberta={fechadura.EstaAberta}/> ));
    },[fechadurasDoUsuario]);

    return(
        <>
            <TopBar icon="door">
                Controle das Fechaduras
            </TopBar>
            <div className="dashboard-content">
                <div className="dashboard-content-header">
                    <h2 className="p-2">
                        Painel de controle de fechaduras
                    </h2>
                    <p className="text-break p-2">
                        Estas são as fechaduras que você tem acesso dentro do sistema. Você pode abrir, fechar ou acessar as configurações da fechadura para obter mais opções
                    </p>
                </div>
                <div className="dashboard-content-body">
                    <div className="row p-3">
                        {fechadurasDoUsuario != null && fechadurasComponentes}
                    </div>
                </div>
            </div>
        </>
        
    );
}