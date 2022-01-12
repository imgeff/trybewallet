import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import BodyTable from './subComponents/tableExpenses/BodyTable';
// import HeaderTable from './subComponents/tableExpenses/HeaderTable';

class TableExpenses extends React.Component {
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

TableExpenses.propTypes = {
  userExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableExpenses);
