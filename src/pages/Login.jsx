import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { dataLogin } from '../actions';
import styles from '../styles/login.modules.css';

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
      <form onSubmit={ this.handleSubmit } className={ styles.form_login }>
        <input
          type="email"
          name="email"
          className={ styles.input_login }
          placeholder="email"
          data-testid="email-input"
          onChange={ this.handleChangeLogin }
          value={ email }
        />
        <input
          type="password"
          name="senha"
          className={ styles.input_login }
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.handleChangeLogin }
          value={ senha }
        />
        {
          this.inputValidation()
            ? <button type="submit" className={ styles.btn_login }>Entrar</button> : (
              <button type="submit" disabled> Entrar</button>)
        }
        { redirect && <Redirect to="/carteira" /> }
      </form>
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
