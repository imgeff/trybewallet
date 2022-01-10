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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
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
      <form onSubmit={ this.handleSubmit }>
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
        { this.inputValidation() ? <button type="submit">Entrar</button> : (
          <button type="submit" disabled> Entrar</button>)}
        { redirect && <Redirect to="/carteira" /> }
      </form>
    );
  }
}

export default Login;
