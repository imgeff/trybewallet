import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { catchStorageExpenses } from '../../actions';
import fetchApi from '../../services/fetchApi';
import TableExpenses from '../../components/TableExpenses';
import HeaderWallet from '../../components/HeaderWallet';
import Footer from '../../components/Footer';
import FormExpense from '../../components/FormExpense';

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

function Wallet({ expenses, dispatchCatchExpenses, userEmail }) {
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

  const setEditExpense = (editEXP) => {
    const indexEditExpense = expenses.indexOf(editEXP);
    setExpense(editEXP);
    setDisplayEdit(true);
    setIndexExpense(indexEditExpense);
  };

  return (
    <>
      <HeaderWallet userEmail={ userEmail } expenses={ expenses } />
      <TableExpenses setEditExpense={ setEditExpense } userExpenses={ expenses } />
      <FormExpense
        setExpense={ setExpense }
        expense={ expense }
        setDisplayEdit={ setDisplayEdit }
        displayEdit={ displayEdit }
        indexExpense={ indexExpense }
        stateDefault={ stateDefault }
      />
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCatchExpenses: (expenses, totalValue) => (
    dispatch(catchStorageExpenses(expenses, totalValue))),
});

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  dispatchCatchExpenses: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
