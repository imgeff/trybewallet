import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="despesa"
            className="input-wallet"
            placeholder="Valor da Despesa"
            data-testid="value-input"
          />
          <input
            type="text"
            name="descricao"
            className="input-wallet"
            placeholder="Descrição da Despesa"
            data-testid="description-input"
          />
          <label htmlFor="moedas">
            Moeda:
            <select name="moeda" data-testid="currency-input" id="moedas">
              <option>BRL</option>
            </select>
          </label>
          <label htmlFor="payment">
            Forma de Pagamento:
            <select name="payment" id="payment" data-testid="method-input">
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
              <option>Dinheiro</option>
              <option>Boleto</option>
              <option>Pix</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select name="tag" id="tag" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Trabalho</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button">Adicionar despesa</button>
        </form>
      </>
    );
  }
}

export default Wallet;
