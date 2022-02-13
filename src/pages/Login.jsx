import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { dataLogin } from '../actions';
import {
  Sform, Slabel, StextLabel, Sinput, Sbutton, Simg, Slink, Stext, Shome,
} from '../styles/Login';
import WalletImg from '../images/walletImg.svg';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      redirect: false,
    };
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { loginSubmit } = this.props;
    const { email } = this.state;
    event.preventDefault();
    loginSubmit(email);
    this.setState({ redirect: true });
  }

  inputValidation() {
    const { email, senha } = this.state;
    const MIN_LENGTH = 6;
    if (senha.length >= MIN_LENGTH && email.includes('@') && email.includes('.com')) {
      return true;
    }
    return false;
  }

  handleChangeLogin({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, senha, redirect } = this.state;
    return (
      <section>
        <Shome>
          <Simg src={ WalletImg } alt="wallet" />
          <Stext>
            Monitore a sua vida financeira de forma simples e online
          </Stext>
          <Slink href="#form-login">Vamos lá!</Slink>
        </Shome>
        <div className="login-container">
          <Sform id="form-login" onSubmit={ this.handleSubmit }>
            <Slabel htmlFor="input-email">
              <StextLabel>Email</StextLabel>
              <Sinput
                id="input-email"
                type="email"
                name="email"
                placeholder="Digite seu Email"
                data-testid="email-input"
                onChange={ this.handleChangeLogin }
                value={ email }
              />
            </Slabel>
            <Slabel htmlFor="input-pass">
              <StextLabel>Senha</StextLabel>
              <Sinput
                id="input-pass"
                type="password"
                name="senha"
                placeholder="Digite sua Senha"
                data-testid="password-input"
                onChange={ this.handleChangeLogin }
                value={ senha }
              />
            </Slabel>
            {
              this.inputValidation()
                ? <Sbutton type="submit">Entrar</Sbutton> : (
                  <Sbutton type="submit" disabled> Entrar</Sbutton>)
            }
            { redirect && <Redirect to="/carteira" /> }
          </Sform>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginSubmit: (data) => dispatch(dataLogin(data)),
});

Login.propTypes = {
  loginSubmit: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
