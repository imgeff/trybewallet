import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPICoin, calculateValue, editExpense } from '../actions';
import fetchApi from '../services/fetchApi';
import TableExpenses from '../components/TableExpenses';

const stateDefault = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

function Wallet(
  { expenses, dispatchEditExpense, dispatchExpense, dispatchValueExpense, userEmail },
) {
  const [expense, setExpense] = useState(stateDefault);

  const [displayEdit, setDisplayEdit] = useState(false);
  const [indexExpense, setIndexExpense] = useState(0);

  useEffect(() => {
    fetchApi()
      .then((data) => {
        delete data.USDT;
        setExpense({ ...expense, exchangeRates: data });
      });
  }, [displayEdit]);

  const catchConvertedValueExpense = () => {
    const { value, currency, exchangeRates } = expense;
    const cambio = Number(exchangeRates[currency].ask);
    const convertedExpenseValue = Number(value) * cambio;
    dispatchValueExpense(convertedExpenseValue, '+');
  };

  const setEditExpense = (editEXP) => {
    const indexEditExpense = expenses.indexOf(editEXP);
    setExpense(editEXP);
    setDisplayEdit(true);
    setIndexExpense(indexEditExpense);
  };

  const sendExpenseEdited = (event) => {
    event.preventDefault();
    dispatchEditExpense(expense, indexExpense);
    setDisplayEdit(false);
    setExpense({ ...stateDefault, id: expense.id + 1 });
  };

  const handleChangeWallet = ({ target: { name, value } }) => {
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatchExpense(expense);
    setExpense({ ...expense, value: '', description: '' });
    catchConvertedValueExpense();
  };

  const catchValueExpenses = () => {
    let totalValue = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      const cambio = exchangeRates[currency].ask;
      const convertedValue = parseFloat(value) * parseFloat(cambio);
      totalValue += convertedValue;
    });
    return totalValue;
  };

  const { value, description, currency, method, tag, exchangeRates } = expense;
  const listOfCurrencyCode = Object.keys(exchangeRates);
  const editBTN = (
    <button type="submit">Editar</button>
  );
  return (
    <>
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
      <form onSubmit={ displayEdit ? sendExpenseEdited : handleSubmit }>
        <input
          type="text"
          name="value"
          className="input-wallet"
          placeholder="Valor da Despesa"
          data-testid="value-input"
          value={ value }
          onChange={ handleChangeWallet }
        />
        <input
          type="text"
          name="description"
          className="input-wallet"
          placeholder="Descrição da Despesa"
          data-testid="description-input"
          value={ description }
          onChange={ handleChangeWallet }
        />
        <label htmlFor="moedas">
          Moeda:
          <select
            name="currency"
            data-testid="currency-input"
            id="moedas"
            value={ currency }
            onChange={ handleChangeWallet }
          >
            {listOfCurrencyCode.map((code) => (
              <option data-testid={ code } key={ code }>{code}</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          Forma de Pagamento:
          <select
            name="method"
            id="payment"
            data-testid="method-input"
            value={ method }
            onChange={ handleChangeWallet }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ handleChangeWallet }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        {displayEdit ? editBTN : <button type="submit">Adicionar despesa</button>}
      </form>
      <TableExpenses setEditExpense={ setEditExpense } userExpenses={ expenses } />
    </>
  );
}
// }

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(fetchAPICoin(expense)),
  dispatchValueExpense: (value, operation) => dispatch(calculateValue(value, operation)),
  dispatchEditExpense: (
    (expense, indexExpense) => dispatch(editExpense(expense, indexExpense))),
});

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  dispatchValueExpense: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
