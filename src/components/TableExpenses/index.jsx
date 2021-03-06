import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, calculateValue } from '../../actions';
import iconEdit from '../../images/lapis.png';
import iconRemove from '../../images/remover.svg';

class TableExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveExpense = this.handleRemoveExpense.bind(this);
    this.catchEditExpense = this.catchEditExpense.bind(this);
    this.orderExpenses = this.orderExpenses.bind(this);
  }

  catchEditExpense(expense) {
    const { setEditExpense } = this.props;
    setEditExpense(expense);
  }

  orderExpenses(expensesFiltered) {
    expensesFiltered.forEach((expense, index) => {
      expense.id = index;
    });
  }

  handleRemoveExpense(expense, convertValue) {
    const { removeUserExpense, userExpenses, dispatchValueExpense } = this.props;
    const filterExpenses = userExpenses
      .filter((expenseOriginal) => expenseOriginal !== expense);
    removeUserExpense(filterExpenses);
    dispatchValueExpense(convertValue, '-');
  }

  render() {
    const { userExpenses, idCSS } = this.props;
    return (
      <section id={ idCSS } className="table-expenses">
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
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => this.catchEditExpense(expense) }
                    >
                      <img src={ iconEdit } alt="button Editar" />
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.handleRemoveExpense(expense, convertValue) }
                    >
                      <img src={ iconRemove } alt="button remover" />
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

const mapDispatchToProps = (dispatch) => ({
  removeUserExpense: (expense) => dispatch(removeExpense(expense)),
  dispatchValueExpense: (value, operation) => dispatch(calculateValue(value, operation)),
});

TableExpenses.propTypes = {
  idCSS: PropTypes.string.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeUserExpense: PropTypes.func.isRequired,
  dispatchValueExpense: PropTypes.func.isRequired,
  setEditExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(TableExpenses);
