import axios from "axios";

export const Api = axios.create({
    baseURL:"http://localhost:8080"
});

export const recuperarInformacoesDoUsuario = async(email) =>{
    try {
        const informacoesDoUsuario = await Api.post('/usuario/email', {email:email});
        return informacoesDoUsuario;
    } catch (error) {
        return null;
    }
}

export const verificarSeUsuarioEhAdmin = async(id) =>{
    try {
        const informacoesDoUsuario = await Api.post('/ambiente/verificar-admin', {idAdmin:id});
        return informacoesDoUsuario;
    } catch (error) {
        return null;
    }
}

export const recuperarAmbientesDoUsuario = async(idAdmin)=>{
    try {
        const ambientesDoUsuario = await Api.post('/ambiente/admin', {idAdmin:idAdmin});
        return ambientesDoUsuario;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const recuperarPermissoesDoUsuario = async(idAdmin)=>{
    try {
        const permissoesDoUsuario = await Api.post('/permissoes/admin', {idAdmin:idAdmin});
        return permissoesDoUsuario;
    } catch (error) { 
        console.log(error);
        return null;
    }
}

export const recuperarFechadurasDoUsuario = async(idUsuario) =>{

    try {
        const fechadurasDoUsuario = await Api.get('/fechadura/admin/'+idUsuario);
        return fechadurasDoUsuario;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const recuperarInformacoesDaFechadura = async(idFechadura) =>{
    try {
        const informacoesDaFechadura = await Api.get('/fechadura/'+idFechadura);
        return informacoesDaFechadura;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const recuperarHistoricoDeFechadura = async(idFechadura) =>{
    try {
        const historicosDaFechadura = await Api.get('historico-fechadura/fechadura/'+idFechadura);
        return historicosDaFechadura;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const recuperarFechadurasDoAmbiente = async(idAmbiente) =>{
    try {
        console.log(idAmbiente);
        const FechadurasDoAmbiente = await Api.get('/fechadura/ambiente/'+idAmbiente);
        return FechadurasDoAmbiente;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const recuperarPermissoesDaFechadura = async (idFechadura) =>{
    try {
        const PermissoesDaFechadura = await Api.post('/permissoes/fechadura', {idFechadura:idFechadura});
        return PermissoesDaFechadura;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const recuperarInformacoesDaPermissao = async (idPermissao) =>{
    try {
        const InformaceoesDaFechadura = await Api.get('/permissoes/'+idPermissao);
        return InformaceoesDaFechadura;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const apagarPermissao = async (idPermissao) =>{
    try {
        const resultadoApagarPermissao = await Api.delete('/permissoes/deletar/'+idPermissao);
        return resultadoApagarPermissao;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const criarPermissao = async (permissao) =>{
    try {
        console.log(permissao);
        switch (permissao.tipoEntrada) {
            case "RFID":
                const permissaoRFIDResult = await Api.post('/permissoes/vincular/usuario-rfid', {idFechadura:permissao.idFechadura,idUsuario:permissao.idUsuario,codigoRFID:permissao.codigoPermissao});
                return permissaoRFIDResult;
            case "SenhaNumerica":
                const permissaoSenhaNumericaResult = await Api.post('/permissoes/vincular/usuario-senha', {idFechadura:permissao.idFechadura,idUsuario:permissao.idUsuario,senhaNumerica:permissao.codigoPermissao});
                return permissaoSenhaNumericaResult;
            case "ImpressaoDigital":
                const permissaoImpressaoDigitalResult = await Api.post('/permissoes/vincular/usuario-digital', {idFechadura:permissao.idFechadura,idUsuario:permissao.idUsuario,idDigital:permissao.codigoPermissao});
                return permissaoImpressaoDigitalResult;
            case "Email":
                const permissaoEmailResult = await Api.post('/permissoes/vincular/usuario-email', {idFechadura:permissao.idFechadura,idUsuario:permissao.idUsuario,email:permissao.codigoPermissao});
                return permissaoEmailResult;
            default:
                throw new Error("Não foi enviado um método de entrada válido!");
        }
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

export const pesquisarConvidado = async (pesquisaData) =>{
    try {
        switch (pesquisaData.criterioPesquisa) {
            case "Email":
                const pesquisaEmailResult = await Api.post('/usuario/email', {email:pesquisaData.textoPesquisa});
                return pesquisaEmailResult;
            case "Id":
                const pesquisaIdResult = await Api.get('/usuario/'+pesquisaData.textoPesquisa);
                return pesquisaIdResult;
            default:
                throw new Error("Não foi enviado um critério de pesquisa válido!");
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const criarConvidado = async(convidado) => {
    try {
        const criarConvidadoResult = await Api.post('/usuario/cadastrar-convidado', {email:convidado.emailUsuario,nome:convidado.nomeUsuario});
        return criarConvidadoResult;
    } catch (error) {
        console.log(error);
        return null;
    }
}