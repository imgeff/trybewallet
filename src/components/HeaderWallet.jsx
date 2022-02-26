import React from 'react';
import { Link } from 'react-router-dom';
import { SheaderValue, SpValue } from '../styles/Header';
import Logo from '../images/wallet.png';
import imgWallet from '../images/walletImg.svg';
import IconLogout from '../images/logout.png';

class HeaderWallet extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      userEmail: '',
    };
  }

  componentDidMount() {
    this.catchNameStorage();
  }

  catchNameStorage = () => {
    const login = JSON.parse(localStorage.getItem('login'));
    this.setState({
      name: login.nameRegister,
      userEmail: login.emailRegister,
    });
  }

  render() {
    const { name, userEmail } = this.state;
    return (
      <header>
        <div className="container-logo">
          <img src={ imgWallet } alt="wallet" id="wallet" />
          <img src={ Logo } alt="Logo" id="logo" />
        </div>
        <div id="box-logout">
          <span id="welcome-text">{`Seja Bem Vindo(a) ${name}!`}</span>
          <Link to="/" id="logout">
            Sair
            <img src={ IconLogout } alt="Logout" />
          </Link>
        </div>
        <div className="container-header">
          <div className="container-email">
            <span id="email-header">Email:</span>
            <p data-testid="email-field">{ userEmail }</p>
          </div>
          <SheaderValue>
            <span id="expense-total">Despesa Total:</span>
            <SpValue data-testid="total-field">
              R$
              { Number(JSON.parse(localStorage.getItem('state')).totalValue).toFixed(2) }
            </SpValue>
            <SpValue data-testid="header-currency-field">BRL</SpValue>
          </SheaderValue>
        </div>
      </header>
    );
  }
}

export default HeaderWallet;
