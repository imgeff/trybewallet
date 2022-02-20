import React from 'react';
import { Redirect } from 'react-router';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      login: {
        name: '',
        email: '',
        password: '',
      },
      redirectLogin: false,
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
  }

  componentDidUpdate() {
    const { login } = this.state;
    localStorage.setItem('login', JSON.stringify(login));
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState((prevState) => (
      { login: { ...prevState.login, [name]: target.value } }
    ), () => this.disabledButton());
  }

  disabledButton() {
    const { login: { email, password } } = this.state;
    const SIX = 6;
    if (email.includes('@') && email.includes('.com') && password.length >= SIX) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { redirectLogin, disabled } = this.state;
    const disabledButton = (
      <button
        style={ { backgroundColor: '#0039e5a9', border: 'none' } }
        type="button"
        data-testid="edit-button-save"
        disabled
      >
        Salvar
      </button>);
    const enabledButton = (
      <button
        type="button"
        data-testid="edit-button-save"
        onClick={ () => this.setState({ redirectLogin: true }) }
      >
        Salvar
      </button>);
    return (
      <form>
        { redirectLogin === true && <Redirect to="/login" />}
        <span>
          Nome
          <p>Fique à vontade para usar seu nome social</p>
          <input
            data-testid="edit-input-name"
            type="text"
            id="edit-input-name"
            name="name"
            placeholder="Usuário"
            onChange={ this.handleChange }
            minLength="1"
          />
        </span>
        <span>
          Email
          <p>Escolha um e-mail que consulte diariamente</p>
          <input
            data-testid="edit-input-email"
            type="email"
            name="email"
            id="edit-input-email"
            placeholder="usuario@usuario.com"
            onChange={ this.handleChange }
          />
        </span>
        <span>
          Senha
          <p>Escolha uma senha que você se lembre com facilidade</p>
          <input
            data-testid="edit-input-password"
            type="password"
            name="password"
            placeholder="Senha"
            onChange={ this.handleChange }
          />
        </span>
        { disabled ? disabledButton : enabledButton }
      </form>
    );
  }
}

export default Register;
