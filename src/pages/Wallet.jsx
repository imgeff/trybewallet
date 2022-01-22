import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPICoin, calculateValue, editExpense } from '../actions';
import fetchApi from '../services/fetchApi';
import HeaderWallet from '../components/HeaderWallet';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
      displayEdit: false,
      indexExpense: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeWallet = this.handleChangeWallet.bind(this);
    this.catchConvertedValueExpense = this.catchConvertedValueExpense.bind(this);
    this.setEditExpense = this.setEditExpense.bind(this);
    this.sendExpenseEdited = this.sendExpenseEdited.bind(this);
  }

  componentDidMount() {
    fetchApi()
      .then((data) => {
        delete data.USDT;
        this.setState({ expense: { exchangeRates: data } });
      });
  }

  setEditExpense(editEXP) {
    const { expenses } = this.props;
    const { expense } = this.state;
    const indexEditExpense = expenses.indexOf(editEXP);
    this.setState({ expense, displayEdit: true, indexExpense: indexEditExpense });
  }

  sendExpenseEdited() {
    const { expense, indexExpense } = this.state;
    const { dispatchEditExpense } = this.props;
    dispatchEditExpense(expense, indexExpense);
    this.setState({ displayEdit: false });
  }

  handleChangeWallet({ target: { name, value } }) {
    this.setState({ expense: { [name]: value } });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatchExpense } = this.props;
    const { expense } = this.state;
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    dispatchExpense(expense);
    this.setState({
      expense: {
        value: '',
        description: '',
      },
    });
    this.catchConvertedValueExpense();
  }

  catchConvertedValueExpense() {
    const { dispatchValueExpense } = this.props;
    const { expense: { value, currency, exchangeRates } } = this.state;
    const cambio = Number(exchangeRates[currency].ask);
    const convertedExpenseValue = Number(value) * cambio;
    dispatchValueExpense(convertedExpenseValue, '+');
  }

  render() {
    const { expense:
      { value, description, currency, method, tag, exchangeRates }, displayEdit,
    } = this.state;
    const listOfCurrencyCode = Object.keys(exchangeRates);
    const editBTN = (
      <button type="button" onClick={ this.sendExpenseEdited }>Editar</button>
    );
    return (
      <>
        <HeaderWallet />
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="value"
            className="input-wallet"
            placeholder="Valor da Despesa"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChangeWallet }
          />
          <input
            type="text"
            name="description"
            className="input-wallet"
            placeholder="Descrição da Despesa"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChangeWallet }
          />
          <label htmlFor="moedas">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              id="moedas"
              value={ currency }
              onChange={ this.handleChangeWallet }
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
              onChange={ this.handleChangeWallet }
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
              onChange={ this.handleChangeWallet }
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
        <TableExpenses setEditExpense={ this.setEditExpense } />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(fetchAPICoin(expense)),
  dispatchValueExpense: (value, operation) => dispatch(calculateValue(value, operation)),
  dispatchEditExpense: (
    (expense, indexExpense) => dispatch(editExpense(expense, indexExpense))),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  dispatchValueExpense: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
