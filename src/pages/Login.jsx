import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { dataLogin } from '../actions';
import {
  Sform, Slabel, StextLabel, Sinput, Sbutton, Simg, Slink, Stext, Shome,
} from '../styles/Login';
import WalletImg from '../images/walletImg.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      redirect: false,
      authentication: {
        feedbackMail: false,
        feedbackPass: false,
        mail: false,
        pass: false,
      },
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

  feedBackAuthenticate(campo) {
    const { email, senha } = this.state;
    const MIN_LENGTH = 6;
    if (campo === 'email') {
      if (email.includes('@') && email.includes('.com')) {
        return this.setState(({ authentication }) => ({
          authentication: { ...authentication, mail: true },
        }));
      }
      if (!email.includes('@') || !email.includes('.com')) {
        return this.setState(({ authentication }) => ({
          authentication: { ...authentication, mail: false, feedbackMail: true },
        }));
      }
    }
    if (campo === 'senha') {
      if (senha.length >= MIN_LENGTH) {
        return this.setState(({ authentication }) => ({
          authentication: { ...authentication, pass: true },
        }));
      } if (senha.length < MIN_LENGTH) {
        return this.setState(({ authentication }) => ({
          authentication: { ...authentication, pass: false, feedbackPass: true },
        }));
      }
    }
  }

  handleChangeLogin({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.feedBackAuthenticate(name));
  }

  render() {
    const { email, senha, redirect, authentication:
      { feedbackMail, feedbackPass, mail, pass } } = this.state;
    return (
      <section>
        <Shome>
          <Simg src={ WalletImg } alt="wallet" />
          <Stext>
            Monitore a sua vida financeira de forma simples e online
          </Stext>
          <Slink href="#form-login">Fazer Login!</Slink>
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
            {feedbackMail ? (
              <span style={ { color: mail ? 'green' : 'red', fontWeight: '700' } }>
                { mail ? '✓ Email válido!' : (
                  'O email deve conter "@" e ".com" para ser válido!')}
              </span>
            ) : null }
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
            { feedbackPass ? (
              <span style={ { color: pass ? 'green' : 'red', fontWeight: '700' } }>
                { pass ? '✓ Senha válida' : (
                  'A senha deve ter no mínimo 6 caracteres para ser válida')}
              </span>
            ) : null }
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
