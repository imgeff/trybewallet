import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <div>
        <p data-testid="email-field">{ userEmail }</p>
      </div>
      <div>
        <p data-testid="total-field">
          {expenses.length !== 0 ? catchValueExpenses().toFixed(2) : 0}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
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
