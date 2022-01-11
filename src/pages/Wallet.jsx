import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      descricao: '',
      moeda: 'BRL',
      metodo: '',
      tag: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeWallet = this.handleChangeWallet.bind(this);
  }

  handleChangeWallet({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit');
  }

  render() {
    const { valor, descricao, moeda, metodo, tag } = this.state;
    return (
      <>
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="valor"
            className="input-wallet"
            placeholder="Valor da Despesa"
            data-testid="value-input"
            value={ valor }
            onChange={ this.handleChangeWallet }
          />
          <input
            type="text"
            name="descricao"
            className="input-wallet"
            placeholder="Descrição da Despesa"
            data-testid="description-input"
            value={ descricao }
            onChange={ this.handleChangeWallet }
          />
          <label htmlFor="moedas">
            Moeda:
            <select
              name="moeda"
              data-testid="currency-input"
              id="moedas"
              value={ moeda }
              onChange={ this.handleChangeWallet }
            >
              <option>BRL</option>
            </select>
          </label>
          <label htmlFor="payment">
            Forma de Pagamento:
            <select
              name="metodo"
              id="payment"
              data-testid="method-input"
              value={ metodo }
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
              <option>Trabalho</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
      </>
    );
  }
}

export default Wallet;
