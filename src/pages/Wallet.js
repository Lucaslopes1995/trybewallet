import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { enviaEditElDespesa, fetchCurrencies, fetchSpent } from '../actions';
import Table from '../components/Table';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
  exchangeRates: {},
  isEdit: false,
  idAtualizar: 100,
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
      const currencie = await getcurrencies(currency, value);
      return currencie;
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { fetchGasto, gastos } = this.props;
      const { isEdit } = this.state;
      console.log(gastos);
      if (!isEdit) {
        const b = this.state;
        delete b.idAtualizar;
        delete b.isEdit;
        fetchGasto(b);
        this.setState({ ...INITIAL_STATE, isEdit: false });
      }
      //   const { currency } = this.state;

      //   console.log(dispatch);
      //   this.fetchAPI(currency, value);
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
      this.setState({ ...despesa, isEdit: true, idAtualizar: despesa.id });
    }

    render() {
      const { currencies } = this.props;
      //   console.log(currencies);
      const { value, description,
        currency, method, tag } = this.state;
      return (
        <div>

          <Header />
          <div>
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="value">
                Valor
                <input
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
                  required
                  role="combobox"
                  id="currency"
                  value={ currency }
                  onChange={ (e) => this.setState({ currency: e.target.value }) }
                >
					<option hidden>Moeda</option>
                  {currencies && currencies.map((el, index) => (
                    <option key={ el + index }>{el}</option>
                  ))}
                </select>
              </label>

              <select
                value={ method }
                onChange={ (e) => this.setState({ method: e.target.value }) }
                data-testid="method-input"
              >
				<option hidden>Forma de Pagamento</option>
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>

              </select>

              <select
                value={ tag }
                onChange={ (e) => this.setState({ tag: e.target.value }) }
                data-testid="tag-input"
              >
				<option hidden>Tag</option>
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>

              </select>

              <label htmlFor="description">
					Descrição
                <input
                  data-testid="description-input"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                  id="description"
                />
              </label>

              <button
                type="submit"
              >
                Adicionar despesa

              </button>
              <button
                type="button"
                onClick={ this.handleEditButton }
              >
                Editar despesa

              </button>
            </form>
          </div>
          <Table editSpent={ this.editSpent } />
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
