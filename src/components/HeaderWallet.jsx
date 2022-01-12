import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { userExpenses } = this.props;
    let totalExpenses = 0;
    if (userExpenses !== undefined) {
      userExpenses.forEach((expense) => {
        totalExpenses += parseFloat(expense.value);
      });
    }
    return totalExpenses;
  }

  render() {
    const { userEmail, userExpenses } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{ userEmail }</p>
        </div>
        <div>
          <p
            data-testid="total-field"
          >
            { userExpenses === undefined ? 0 : this.sumExpenses() }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
