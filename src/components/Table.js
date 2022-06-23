import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { despesas } = this.props;
    // const { exchangeRates } = despesas[0];
    console.log(despesas);
    return (
      <table>
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
        {despesas?.map((el, index) => (
          <tr key={ index + el.id }>
            <td>{el.description}</td>
            <td>{el.tag}</td>
            <td>{el.method}</td>
            <td>{parseFloat(el.value).toFixed(2)}</td>
            <td>{ el.exchangeRates[el.currency].name}</td>
            <td>{parseFloat(el.exchangeRates[el.currency].ask).toFixed(2)}</td>
            <td>
              {(parseFloat(el.exchangeRates[el.currency].ask)
            * parseFloat(el.value)).toFixed(2)}

            </td>
            <td>Real</td>
            <td>{el.description}</td>

          </tr>
        ))}
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

Table.propTypes = {
  despesas: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(Table);
