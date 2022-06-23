import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
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
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

// Table.propTypes = {
//   getcurrencies: PropTypes.func.isRequired,
//   fetchGasto: PropTypes.func.isRequired,
//   currencies: PropTypes.node.isRequired,

// };

export default connect(mapStateToProps)(Table);
