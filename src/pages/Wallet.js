import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { enviaEditElDespesa, fetchCurrencies, fetchSpent } from '../actions';
import Table from '../components/Table';
import './Wallet.css'

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
  exchangeRates: {},
  isEdit: false,
  idAtualizar: 100,
  setButtonAdd:true
};

class Wallet extends React.Component {
   state=INITIAL_STATE

   componentDidMount() {
     this.fetchAPI();
   }

    fetchAPI = async (currency = '') => {
      const { getcurrencies } = this.props;
      const { value } = this.state;
      //   console.log(value);
      await getcurrencies(currency, value);

    }

    handleChange = ({ target }) => {
      const { name, value } = target;
	//   console.log(value)
	  this.setState((state)=>({...state,[name]:value}),this.showAddSpend)
    //   this.setState({ [name]: value },this.showAddSpend());
	  
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { fetchGasto, gastos } = this.props;
      const { isEdit } = this.state;
    //   console.log(gastos);
      if (!isEdit) {
        const b = this.state;
        delete b.idAtualizar;
        delete b.isEdit;
        fetchGasto(b);
        this.setState({ ...INITIAL_STATE, isEdit: false });
      }
    }

    handleEditButton = (e) => {
      e.preventDefault();
      const { gastos, editaDespesa } = this.props;
      const { isEdit } = this.state;
      if (isEdit) {
        const a = this.state;
        delete a.idAtualizar;
        delete a.isEdit;
        this.setState({ ...INITIAL_STATE, isEdit: false });
        this.setState({ ...INITIAL_STATE, isEdit: false });
        return editaDespesa(a, gastos);
      }
    }

    editSpent = (despesa) => {
      this.setState({ ...despesa, isEdit: true, idAtualizar: despesa.id, setButtonAdd:true });
    }

	deleteSpent = () => {
		this.setState({...INITIAL_STATE, isEdit: false, setButtonAdd:true });
	}

	showAddSpend = () => {
		const {value,description,currency,method,tag, isEdit} = this.state;
		// console.log(this.state)
		if(!value || !description || !currency || !method || !tag || isEdit){
			// console.log(isEdit)
			return this.setState({setButtonAdd:true})
		}
		return this.setState({setButtonAdd:false})

	}

    render() {
      const { currencies } = this.props;
      //   console.log(currencies);
      const { value, description,
        currency, method, tag, setButtonAdd, isEdit} = this.state;
		// console.log(setButtonAdd)
      return (
        <div className='container-wallet'>

          <Header currencies={currencies}/>
          <div className='wallet-data'>
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="value">
                Valor
                <input
				autoComplete='off'
				type="number"
                  required
                  data-testid="value-input"
                  name="value"
                  value={ value }
                  onChange={ this.handleChange }
                  id="value"
                />
              </label>
              <label htmlFor="currency">
                Moeda
                <select
				  name = "currency"
                  required
                  role="combobox"
                  id="currency"
                  value={ currency }
                  onChange={ this.handleChange }
                >
					<option hidden>Moeda</option>
                  {currencies && currencies.map((el, index) => (
                    <option key={ el + index }>{el}</option>
                  ))}
                </select>
              </label>
			  <label htmlFor="method">
                Pagamento
              <select
			  	id="method"
                value={ method }
				name = "method"
                onChange={ this.handleChange }
                data-testid="method-input"
				required
              >
				<option hidden>Forma de Pagamento</option>
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>

              </select>
			  </label>
			  <label htmlFor="tag">
                Tag
              <select
			  	id="tag"
                value={ tag }
				name = "tag"
                onChange={ this.handleChange }
                data-testid="tag-input"
				required
              >
				<option hidden>Tag</option>
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>

              </select>
			  </label>

              <label htmlFor="description">
					Descrição
                <input
				  required
				  autoComplete='off'
                  data-testid="description-input"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                  id="description"
                />
              </label>

              <button
                type="submit"
				disabled={setButtonAdd}
              >
                Adicionar despesa

              </button>
              <button
                type="button"
                onClick={ this.handleEditButton }
				disabled={!isEdit}
              >
                Editar despesa

              </button>
            </form>
          <Table editSpent={ this.editSpent } deleteSpent= {this.deleteSpent}/>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  gastos: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getcurrencies: (moeda, value) => { dispatch(fetchCurrencies(moeda, value)); },
  fetchGasto: (spent) => { dispatch(fetchSpent(spent)); },
  editaDespesa: (despesa, todasDespesas) => {
    dispatch(enviaEditElDespesa(despesa, todasDespesas));
  },
});

Wallet.propTypes = {
  getcurrencies: PropTypes.func.isRequired,
  fetchGasto: PropTypes.func.isRequired,
  currencies: PropTypes.node.isRequired,
  gastos: PropTypes.node.isRequired,
  editaDespesa: PropTypes.node.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
