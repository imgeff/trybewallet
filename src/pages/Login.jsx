import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <>
        <input
          type="email"
          name="email"
          className="input-login"
          placeholder="email"
          data-testid="email-input"
        />
        <input
          type="password"
          name="senha"
          className="input-login"
          placeholder="senha"
          data-testid="password-input"
        />
        <button type="button" disabled>Entrar</button>
      </>
    );
  }
}

export default Login;
