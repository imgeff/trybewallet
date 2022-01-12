import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPICoin, sumValue } from '../actions';
import fetchApi from '../services/fetchApi';
import Header from '../components/HeaderWallet';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeWallet = this.handleChangeWallet.bind(this);
    this.catchConvertedValueExpense = this.catchConvertedValueExpense.bind(this);
  }

  componentDidMount() {
    fetchApi()
      .then((data) => {
        delete data.USDT;
        this.setState({ exchangeRates: data });
      });
  }

  handleChangeWallet({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatchExpense } = this.props;
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    dispatchExpense(this.state);
    this.setState({
      value: '',
      description: '',
    });
    this.catchConvertedValueExpense();
  }

  catchConvertedValueExpense() {
    const { dispatchValueExpense } = this.props;
    const { value, currency, exchangeRates } = this.state;
    const cambio = Number(exchangeRates[currency].ask);
    const convertedExpenseValue = Number(value) * cambio;
    dispatchValueExpense(convertedExpenseValue);
  }

  render() {
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const listOfCurrencyCode = Object.keys(exchangeRates);
    return (
      <>
        <Header />
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
          <button type="submit">Adicionar despesa</button>
        </form>
        <TableExpenses />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(fetchAPICoin(expense)),
  dispatchValueExpense: (value) => dispatch(sumValue(value)),
});

Wallet.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  dispatchValueExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
