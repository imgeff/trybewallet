import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      redirect: false,
    };
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  handleClickLogin() {
    this.setState({ redirect: true });
  }

  handleChangeLogin({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const MIN_LENGTH = 6;
    const { email, senha, redirect } = this.state;
    return (
      <>
        <input
          type="email"
          name="email"
          className="input-login"
          placeholder="email"
          data-testid="email-input"
          onChange={ this.handleChangeLogin }
          value={ email }
        />
        <input
          type="password"
          name="senha"
          className="input-login"
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.handleChangeLogin }
          value={ senha }
        />
        {senha.length < MIN_LENGTH ? <button type="button" disabled>Entrar</button> : (
          <button
            type="button"
            onClick={ this.handleClickLogin }
          >
            Entrar
          </button>
        )}
        { redirect && <Redirect to="/carteira" /> }
      </>
    );
  }
}

export default Login;
