import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Sform, Slabel, Sinput, Sbutton } from '../../styles/Global';
import { StextLabel } from '../../styles/Login';
import { dataLogin } from '../../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      redirect: false,
      authentication: {
        mail: false,
        pass: false,
        feedbackMail: false,
        feedbackPass: false,
        feedbackLogin: false,
      },
      register: { nameRegister: '', emailRegister: '', passRegister: '' },
    };
    this.catchRegister = this.catchRegister.bind(this);
    this.authenticationLogin = this.authenticationLogin.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
  }

  componentDidMount() {
    this.catchRegister();
  }

  catchRegister() {
    const loginStorage = JSON.parse(localStorage.getItem('login'));
    this.setState({ register: loginStorage });
  }

  authenticationLogin(event) {
    const { loginSubmit } = this.props;
    const { email, senha, register: { emailRegister, passRegister } } = this.state;
    event.preventDefault();
    if (email === emailRegister && senha === passRegister) {
      loginSubmit(email);
      this.setState({ redirect: true });
    } else {
      this.setState((prevState) => ({
        authentication: { ...prevState.authentication, feedbackLogin: true },
      }));
    }
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
    const {
      email, senha, redirect,
      authentication: { feedbackMail, feedbackPass, feedbackLogin, mail, pass },
    } = this.state;

    return (
      <div className="login-container">
        <Sform id="form-login" onSubmit={ this.authenticationLogin }>
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
              spellCheck="false"
            />
          </Slabel>
          {
            feedbackMail ? (
              <span
                style={ { color: mail ? 'green' : 'red', fontWeight: '700' } }
                className="feedback-login"
              >
                { mail ? '✓ Email válido!' : (
                  'O email deve conter "@" e ".com" para ser válido!')}
              </span>
            ) : null
          }
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
            feedbackPass ? (
              <span
                style={ { color: pass ? 'green' : 'red', fontWeight: '700' } }
                className="feedback-login"
              >
                { pass ? '✓ Senha válida' : (
                  'A senha deve ter no mínimo 6 caracteres para ser válida')}
              </span>
            ) : null
          }
          {
            feedbackLogin ? (
              <span
                style={ { color: 'red', fontWeight: '700' } }
                className="feedback-login"
              >
                Email ou senha Incorreta
              </span>
            ) : null
          }
          {
            this.inputValidation()
              ? <Sbutton type="submit">Entrar</Sbutton> : (
                <Sbutton type="submit" disabled style={ { cursor: 'not-allowed' } }>
                  Entrar
                </Sbutton>)
          }
          { redirect && <Redirect to="/carteira" /> }
        </Sform>
      </div>
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
