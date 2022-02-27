import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPICoin, calculateValue, editExpense,
  catchStorageExpenses } from '../actions';
import fetchApi from '../services/fetchApi';
import TableExpenses from '../components/TableExpenses';
import HeaderWallet from '../components/HeaderWallet';
import { SbuttonAddExpense } from '../styles/Login';
import Footer from '../components/Footer';

const stateDefault = {
  value: '',
  description: '',
  currency: 'BRL',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

const rateBRL = {
  code: 'BRL',
  codein: 'BRL',
  name: 'Real/Real Brasileiro',
  ask: '1',
};

function Wallet(
  { expenses, dispatchEditExpense, dispatchExpense, dispatchValueExpense,
    dispatchCatchExpenses, userEmail },
) {
  const [expense, setExpense] = useState(stateDefault);

  const [displayEdit, setDisplayEdit] = useState(false);
  const [indexExpense, setIndexExpense] = useState(0);

  useEffect(() => {
    fetchApi()
      .then((data) => {
        delete data.USDT;
        data.BRL = rateBRL;
        setExpense({ ...expense, exchangeRates: data });
      });
  }, [displayEdit]);

  useEffect(() => {
    const stateStorage = JSON.parse(localStorage.getItem('state'));
    dispatchCatchExpenses(stateStorage.expenses, stateStorage.totalValue);
  }, []);

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
    catchConvertedValueExpense();
    dispatchExpense(expense);
    setExpense({ ...expense, value: '', description: '' });
  };

  const { value, description, currency, method, tag, exchangeRates } = expense;
  const listOfCurrencyCode = Object.keys(exchangeRates);
  const editBTN = (
    <SbuttonAddExpense type="submit">Editar despesa</SbuttonAddExpense>
  );
  return (
    <>
      <HeaderWallet userEmail={ userEmail } expenses={ expenses } />
      <TableExpenses setEditExpense={ setEditExpense } userExpenses={ expenses } />
      <form
        onSubmit={ displayEdit ? sendExpenseEdited : handleSubmit }
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
            onChange={ handleChangeWallet }
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
            onChange={ handleChangeWallet }
          />
        </label>
        <label htmlFor="moedas">
          Moeda
          <select
            name="currency"
            data-testid="currency-input"
            id="moedas"
            value={ currency }
            onChange={ handleChangeWallet }
          >
            <option>BRL</option>
            {listOfCurrencyCode.map((code) => (
              <option data-testid={ code } key={ code }>{code}</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          Forma de Pagamento
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
          Tag
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
        {displayEdit ? editBTN : (
          <SbuttonAddExpense type="submit">Adicionar despesa</SbuttonAddExpense>)}
      </form>
      <Footer />
    </>
  );
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

Wallet.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  dispatchValueExpense: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
  dispatchCatchExpenses: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
