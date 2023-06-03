import {
    Routes,
    Route
} from 'react-router-dom';

import Root from '../pages/Authentication/Root';
import Login from '../pages/Authentication/Login';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import Dashboard from '../pages/Dashboard/Dashboard';
import Fechaduras from '../pages/Dashboard/Fechaduras/Fechaduras';
import Ambientes from '../pages/Dashboard/Ambientes/Ambientes';
import Permissoes from '../pages/Dashboard/Permissoes/Permissoes';
import PermissoesDaFechadura from '../pages/Dashboard/Permissoes/PermissoesDaFechadura';
import CriarPermissao from '../pages/Dashboard/Permissoes/CriarPermissao';
import CriarUsuarioConvidado from '../pages/Dashboard/Permissoes/CriarUsuarioConvidado';
import PesquisarConvidado from '../pages/Dashboard/Permissoes/PesquisarConvidado';
import DetalheFechadura from '../pages/Dashboard/Fechaduras/DetalheFechadura';
import DetalhePermissao from '../pages/Dashboard/Permissoes/DetalhePermissao';
import HistoricoFechadura from '../pages/Dashboard/Fechaduras/HistoricoFechadura';
import FechadurasDoAmbiente from '../pages/Dashboard/Fechaduras/FechadurasDoAmbiente';

export default function MainRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Root/>}>
                <Route path="/" index element={<Login/>}/>
                <Route path="/esqueceu-senha" element={<ForgotPassword/>}/>
            </Route>

            <Route path="/dashboard" element={<Dashboard/>}>
                <Route path="/dashboard" index element={<Fechaduras/>}/>
                <Route path="/dashboard/detalhe-fechadura/:idFechadura" index element={<DetalheFechadura/>}/>
                <Route path="/dashboard/historico-fechadura/:idFechadura" index element={<HistoricoFechadura/>}/>
                <Route path="/dashboard/fechadura/ambiente/:idAmbiente" index element={<FechadurasDoAmbiente/>}/>
                <Route path="/dashboard/ambientes" index element={<Ambientes/>}/>
                <Route path="/dashboard/permissoes" index element={<Permissoes/>}/>
                <Route path="/dashboard/detalhe-permissoes/:idPermissao" index element={<DetalhePermissao/>}/>
                <Route path="/dashboard/permissoes/fechadura/:idFechadura" index element={<PermissoesDaFechadura/>}/>
                <Route path="/dashboard/permissoes/criar" index element={<CriarPermissao/>}/>
                <Route path="/dashboard/permissoes/criar-convidado" index element={<CriarUsuarioConvidado/>}/>
                <Route path="/dashboard/permissoes/pesquisar-convidado" index element={<PesquisarConvidado/>}/>
            </Route>

            <Route path="*" element={<h1>A página não foi encontrada</h1>}/>
        </Routes>
    )
}