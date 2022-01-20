import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends React.Component {
  constructor() {
    super();
    this.catchValueExpenses = this.catchValueExpenses.bind(this);
  }

  catchValueExpenses() {
    const { expenses } = this.props;
    let totalValue = 0;
    expenses.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      const cambio = exchangeRates[currency].ask;
      const convertedValue = parseFloat(value) * parseFloat(cambio);
      totalValue += convertedValue;
    });
    return totalValue;
  }

  render() {
    const { userEmail, expenses } = this.props;
    const { catchValueExpenses } = this;
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
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

HeaderWallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(HeaderWallet);
