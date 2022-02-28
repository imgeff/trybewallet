import React from 'react';
import { Redirect } from 'react-router';
import Sp from '../../styles/Register';
import { Sform, Slabel, Sinput, Sbutton } from '../../styles/Global';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      login: {
        nameRegister: '',
        emailRegister: '',
        passRegister: '',
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
    const { login: { emailRegister, passRegister } } = this.state;
    const SIX = 6;

    const validRegister = (emailRegister.includes('@') && emailRegister.includes('.com')
    && passRegister.length >= SIX);

    if (validRegister) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { redirectLogin, disabled } = this.state;
    const disabledButton = (
      <Sbutton
        type="button"
        data-testid="edit-button-save"
        disabled
      >
        Salvar
      </Sbutton>);
    const enabledButton = (
      <Sbutton
        type="button"
        data-testid="edit-button-save"
        onClick={ () => this.setState({ redirectLogin: true }) }
      >
        Salvar
      </Sbutton>);
    return (
      <Sform>
        { redirectLogin === true && <Redirect to="/login" />}
        <Slabel>
          Nome
          <Sp>Fique à vontade para usar seu nome social</Sp>
          <Sinput
            data-testid="edit-input-name"
            type="text"
            id="edit-input-name"
            name="nameRegister"
            placeholder="Usuário"
            onChange={ this.handleChange }
            minLength="1"
          />
        </Slabel>
        <Slabel>
          Email
          <Sp>Escolha um e-mail que consulte frequentemente</Sp>
          <Sinput
            data-testid="edit-input-email"
            type="email"
            name="emailRegister"
            id="edit-input-email"
            placeholder="usuario@usuario.com"
            onChange={ this.handleChange }
          />
        </Slabel>
        <Slabel>
          Senha
          <Sp>Escolha uma senha que você se lembre com facilidade</Sp>
          <Sinput
            data-testid="edit-input-password"
            type="password"
            name="passRegister"
            placeholder="Senha"
            onChange={ this.handleChange }
          />
        </Slabel>
        { disabled ? disabledButton : enabledButton }
      </Sform>
    );
  }
}

export default Register;
