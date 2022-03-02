import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPICoin, calculateValue, editExpense,
  catchStorageExpenses } from '../../actions';
import { SbuttonAddExpense } from '../../styles/Login';

class FormExpense extends React.Component {
  catchConvertedValueExpense = () => {
    const { expense, dispatchValueExpense } = this.props;
    const { value, currency, exchangeRates } = expense;
    const cambio = Number(exchangeRates[currency].ask);
    const convertedExpenseValue = Number(value) * cambio;
    dispatchValueExpense(convertedExpenseValue, '+');
  };

  sendExpenseEdited = (event) => {
    event.preventDefault();
    const { expense, indexExpense, stateDefault,
      setDisplayEdit, setExpense, dispatchEditExpense } = this.props;
    dispatchEditExpense(expense, indexExpense);
    setDisplayEdit(false);
    setExpense({ ...stateDefault, id: expense.id + 1 });
  };

  handleChangeWallet = ({ target: { name, value } }) => {
    const { setExpense, expense } = this.props;
    setExpense({ ...expense, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { setExpense, dispatchExpense, expense } = this.props;
    this.catchConvertedValueExpense();
    dispatchExpense(expense);
    setExpense({ ...expense, value: '', description: '' });
  };

  render() {
    const { expense, displayEdit } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = expense;
    const listOfCurrencyCode = Object.keys(exchangeRates);

    return (
      <form
        onSubmit={ displayEdit ? this.sendExpenseEdited : this.handleSubmit }
        className="form-expense"
      >
        <label htmlFor="input-value">
          Valor
          <input
            type="number"
            name="value"
            id="input-value"
            className="input-wallet"
            placeholder="Valor da Despesa"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChangeWallet }
          />
        </label>
        <label htmlFor="input-description">
          Descrição
          <input
            type="text"
            id="input-description"
            name="description"
            className="input-wallet"
            placeholder="Descrição da Despesa"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChangeWallet }
            spellCheck="false"
          />
        </label>
        <label htmlFor="moedas">
          Moeda
          <select
            name="currency"
            data-testid="currency-input"
            id="moedas"
            value={ currency }
            onChange={ this.handleChangeWallet }
          >
            {/* <option>BRL</option> */}
            {
              listOfCurrencyCode.map((code) => (
                <option data-testid={ code } key={ code }>{code}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="payment">
          Forma de Pagamento
          <select
            name="method"
            id="payment"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChangeWallet }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChangeWallet }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <SbuttonAddExpense type="submit">
          { displayEdit ? 'Editar Despesa' : 'Adicionar Despesa'}
        </SbuttonAddExpense>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(fetchAPICoin(expense)),
  dispatchValueExpense: (value, operation) => dispatch(calculateValue(value, operation)),
  dispatchEditExpense: (
    (expense, indexExpense) => dispatch(editExpense(expense, indexExpense))),
  dispatchCatchExpenses: (expenses, totalValue) => (
    dispatch(catchStorageExpenses(expenses, totalValue))),
});

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

FormExpense.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  dispatchValueExpense: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
  displayEdit: PropTypes.bool.isRequired,
  indexExpense: PropTypes.number.isRequired,
  setExpense: PropTypes.func.isRequired,
  setDisplayEdit: PropTypes.func.isRequired,
  stateDefault: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
  expense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
