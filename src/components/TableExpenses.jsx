import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, calculateValue } from '../actions';

class TableExpenses extends React.Component {
  constructor() {
    super();
    this.handleRemoveExpense = this.handleRemoveExpense.bind(this);
    this.catchConvertedValueExpense = this.catchConvertedValueExpense.bind(this);
  }

  handleRemoveExpense(expense) {
    const { removeUserExpense } = this.props;
    removeUserExpense(expense);
    this.catchConvertedValueExpense(expense);
  }

  catchConvertedValueExpense(expense) {
    const { dispatchValueExpense } = this.props;
    const { value, currency, exchangeRates } = expense;
    const cambio = Number(exchangeRates[currency].ask);
    const convertedExpenseValue = Number(value) * cambio;
    dispatchValueExpense(convertedExpenseValue, '-');
  }

  render() {
    const { userExpenses } = this.props;
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {userExpenses !== undefined && userExpenses.map((expense) => {
              const {
                id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              } = expense;
              const nameCurrency = exchangeRates[currency].name.split('/')[0];
              const convertCambioForNumber = Number(exchangeRates[currency].ask);
              const cambio = convertCambioForNumber.toFixed(2);
              const convertValue = (value * convertCambioForNumber).toFixed(2);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{nameCurrency}</td>
                  <td>{cambio}</td>
                  <td>{convertValue}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.handleRemoveExpense(expense) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeUserExpense: (expense) => dispatch(removeExpense(expense)),
  dispatchValueExpense: (value, operation) => dispatch(calculateValue(value, operation)),
});

TableExpenses.propTypes = {
  userExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeUserExpense: PropTypes.func.isRequired,
  dispatchValueExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
