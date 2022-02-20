import React from 'react';
import { Link } from 'react-router-dom';
import { Simg, Slink, Stext, Shome } from '../styles/Login';
import SlinkBtn from '../styles/BtnNewAccount';
import WalletImg from '../images/walletImg.svg';

class Home extends React.Component {
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
          <SlinkBtn href="#gege">Ainda não tem um conta? Crie aqui!</SlinkBtn>
        </Shome>
      </section>
    );
  }
}

export default Home;
