import React from 'react';

export default function ForgotPassword(){
    
    return(
        <div className='inner-container'>
            <h1 className="internal-title">Esqueceu a senha?</h1>
            <div className="inner-title-div">
                <p className="inner-title">Digite seu email para solicitar a mudança de senha</p>
            </div>
            <br/>
            <form>
                <label htmlFor="email" className='default-input-label'>
                    Email
                </label>
                <input type="text" name="id-fechadura" className='default-input'/>

                <footer className='forgot-footer'>
                    <button type="button" className='primary-button'>Solicitar Mudança</button>
                </footer>
                
            </form>
        </div>
    );
}