import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteElDespesa, liberaEditElDespesa } from '../actions';
import './Table.css';
import deletar from '../images/lixeira.png';
import editar from '../images/edit.png';

class Table extends React.Component {
  render() {
    const { despesas, deleteDespesa, editSpent, deleteSpent, moeda} = this.props;
    // const { exchangeRates } = despesas[0];
    console.log(despesas);
    return (
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
			{despesas?.map((el, index) => (
			<tr key={ index + el.id }>
				<td>{el.description}</td>
				<td>{el.tag}</td>
				<td>{el.method}</td>
				<td>{parseFloat(el.value).toFixed(2)}</td>
				<td>{ el.exchangeRates[el.currency].name?.replace(/(.+)\/.+/,(td,pt1)=>pt1)}</td>
				<td>{(moeda!=="BRL")?(parseFloat(el.exchangeRates[el.currency]?.ask)
				/
				(parseFloat(el.exchangeRates[moeda]?.ask))
				
				
				)
				
				.toFixed(2)
				:
				parseFloat(el.exchangeRates[el.currency]?.ask).toFixed(2)
				}</td>


				<td>
				{(moeda!=="BRL")?
				
				((parseFloat(el.exchangeRates[el.currency]?.ask)
				/
				(parseFloat(el.exchangeRates[moeda]?.ask)))
				* parseFloat(el.value)).toFixed(2)

				:

				(parseFloat(el.exchangeRates[el.currency]?.ask)
				* parseFloat(el.value)).toFixed(2)
				
				
				}

				</td>
				<td>{el.exchangeRates[moeda]?.name.replace(/(.+)\/.+/,(td,pt1)=>pt1) || "BRL"}</td>
				<td>
				<div className='div-buttons'>
					<button 
						className='edit-button'
						onClick={ () => editSpent(el) }
						data-testid="edit-btn"
						type="button"
					>
						<img src = {editar} alt="editar"/>

					</button>

					<button 
						className='delete-button'
						onClick={ () => {deleteDespesa(el, despesas);deleteSpent()} }
						data-testid="delete-btn"
						type="button"
					>
						<img src = {deletar} alt="deletar"/>
					</button>

				</div>

				</td>
				

			</tr>
			))}
		</tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
  moeda: state.wallet.moeda
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
  deleteSpent: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
