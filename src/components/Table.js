import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteElDespesa, liberaEditElDespesa } from '../actions';

class Table extends React.Component {
  render() {
    const { despesas, deleteDespesa, editSpent } = this.props;
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
            <td>

              <button
                onClick={ () => editSpent(el) }
                data-testid="edit-btn"
                type="button"
              >
                Editar

              </button>

              <button
                onClick={ () => deleteDespesa(el, despesas) }
                data-testid="delete-btn"
                type="button"
              >
                Deletar
              </button>

            </td>

          </tr>
        ))}
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDespesa: (despesa, todasDespesas) => {
    dispatch(deleteElDespesa(despesa, todasDespesas));
  },
  editDespesa: (despesa, todasDespesas) => {
    dispatch(liberaEditElDespesa(despesa, todasDespesas));
  },
});

Table.propTypes = {
  despesas: PropTypes.node.isRequired,
  deleteDespesa: PropTypes.func.isRequired,
  editSpent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
