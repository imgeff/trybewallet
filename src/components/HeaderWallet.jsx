import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SheaderValue, SpValue } from '../styles/Header';

function HeaderWallet({ userEmail, expenses }) {
  const catchValueExpenses = () => {
    let totalValue = 0;
    expenses.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      const cambio = exchangeRates[currency].ask;
      const convertedValue = parseFloat(value) * parseFloat(cambio);
      totalValue += convertedValue;
    });
    return totalValue;
  };

  return (
    <header>
      <div>Logo</div>
      <div>
        <p data-testid="email-field">{ `Email: ${userEmail}` }</p>
      </div>
      <SheaderValue>
        Despesa Total:
        <SpValue data-testid="total-field">
          R$
          {expenses.length !== 0 ? catchValueExpenses().toFixed(2) : 0.00}
        </SpValue>
        <SpValue data-testid="header-currency-field">BRL</SpValue>
      </SheaderValue>
    </header>
  );
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

HeaderWallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(HeaderWallet);
