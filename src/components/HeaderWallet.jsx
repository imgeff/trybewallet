import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail, totalValue } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{ userEmail }</p>
        </div>
        <div>
          <p
            data-testid="total-field"
          >
            {totalValue !== undefined ? totalValue.toFixed(2) : 0}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalValue: state.wallet.totalValue,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
