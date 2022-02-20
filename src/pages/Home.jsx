import React from 'react';
import { Link } from 'react-router-dom';
import { Simg, Slink, Stext, Shome } from '../styles/Login';
import WalletImg from '../images/walletImg.svg';

class Home extends React.Component {
  componentDidMount() {
    const login = { nameRegister: '', emailRegister: '', passRegister: '' };
    if (localStorage.getItem('login') === null) {
      localStorage.setItem('login', JSON.stringify(login));
    }
  }

  render() {
    return (
      <section>
        <Shome>
          <Simg src={ WalletImg } alt="wallet" />
          <Stext>
            Monitore a sua vida financeira de forma simples e online
          </Stext>
          <Link to="/login" className="link-login">
            <Slink>Fazer Login!</Slink>
          </Link>
          <Link to="/register" className="link-register">
            Ainda não tem um conta? Crie aqui!
          </Link>
        </Shome>
      </section>
    );
  }
}

export default Home;
