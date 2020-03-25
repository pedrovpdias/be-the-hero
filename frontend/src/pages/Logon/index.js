import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png'; 

function Logon(){
  const [id, setId] = useState();
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Falha no login! Tente novamente');
    }
  }
  return(
    <>
      <div className="logon-container">
        <section className="form">
          <img src={logoImg} alt="Be The Hero" />  
            <form onSubmit={handleLogin}>
              <h1>Faça seu logon</h1>

              <input
                value={id}
                onChange={e => setId(e.target.value)}
                placeholder="Sua ID"
              />
              <button type="submit" className="button">Entrar</button>  

              <Link to="/register" className="main-link">
                <FiLogIn size={16} color="#e02041" />
                Não tenho cadastro
              </Link>
            </form>          
        </section>
        <img src={herosImg} alt="Heroes" />
      </div> 
    </>
    );
}

export default Logon;