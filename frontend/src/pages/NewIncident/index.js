import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

function NewIncident(){
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    
    const [ title, setTitle ] = useState();
    const [ description, setDescription ] = useState();
    const [ value, setValue ] = useState();

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            alert('Caso cadastrado com sucesso!');
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar o caso! Tente novamente')
        }
    }
    
    return (
        <div className="new-incident-container">
           <div className="content">
               <section> 
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolvê-lo.
                    </p>

                    <Link className="main-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
               </section>
               <form onSubmit={handleNewIncident}>
                   <input 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        placeholder="Título do caso"/>
                   <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição" />
                   <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        type="text" 
                        placeholder="Valor (R$)"/>
                   <button className="button" type="submit">Cadastrar</button>                
               </form>
           </div>
       </div> 
    );
}

export default NewIncident;