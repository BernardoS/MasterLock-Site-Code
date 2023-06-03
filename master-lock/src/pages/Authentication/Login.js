import React, { useState } from 'react';
import Swal from "sweetalert2";
import { Link,useNavigate } from 'react-router-dom';

import { useAuth } from "../../contexts/AuthContext/useAuth";

export default function Login(){

    const auth = useAuth();

    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');

    const navigate = useNavigate(); 


    const handleEmail = (event) =>{
        setEmail(event.target.value);
    };

    const handleSenha = (event) =>{
        setSenha(event.target.value);
    };


    const handleSubmit = async() =>{

        Swal.showLoading();

        try {
            await auth.authenticate(email,senha);
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'Acesso permitido',
                text: "Login realizado com sucesso"
              });
              navigate('/dashboard');
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Erro na autênticação',
                text: "Houve algum erro ao tentar autênticar o usuário"
              });
        }
    }

    
    return(
        <div className='inner-container'>
            <h1 className="internal-title">Login</h1>
            <br/>
            <form>
                <label htmlFor="email" className='default-input-label'>
                    Email
                </label>
                <input type="text" name="username" className='default-input' value={email} onChange={handleEmail}/>
                
                <label htmlFor="senha" className='default-input-label'>
                    Senha
                </label>
                <input type="password" name="senha" className='default-input' value={senha} onChange={handleSenha}/>

                <Link className="link-default" to={'/esqueceu-senha'}>Esqueci a senha</Link>

                <footer className='login-footer'>
                    {/*<button type="button" onClick={()=>navigate('/esqueceu-senha')} className="secondary-button">Registrar</button>*/}
                    <button type="button" onClick={()=>handleSubmit()} className="primary-button">Solicitar Entrada</button>
                </footer>
            </form>
        </div>
    );
}