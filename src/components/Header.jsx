import React from 'react';

function Header() {
  return (
    <header>
      <div>
        <p data-testid="email-field">teste@teste.com</p>
      </div>
      <div>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    </header>
  );
}

export default Header;
