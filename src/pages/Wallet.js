import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies, fetchSpent } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
  exchangeRates: {},
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
      const { fetchGasto } = this.props;
      //   const { currency } = this.state;
      e.preventDefault();
      //   console.log(dispatch);
      //   this.fetchAPI(currency, value);
      fetchGasto(this.state);
      this.setState(INITIAL_STATE);
    }

    render() {
      const { email, currencies } = this.props;
      //   console.log(currencies);
      const { value, descricao: description,
        currency, method, tag } = this.state;
      return (
        <div>

          <Header />
          <div>
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="value">
                Valor
                <input
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
                  role="combobox"
                  id="currency"
                  value={ currency }
                  onChange={ (e) => this.setState({ currency: e.target.value }) }
                >
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

                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>

              </select>

              <select
                value={ tag }
                onChange={ (e) => this.setState({ tag: e.target.value }) }
                data-testid="tag-input"
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>

              </select>

              <label htmlFor="description">

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
            </form>
          </div>
          <p>{email}</p>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getcurrencies: (moeda, value) => { dispatch(fetchCurrencies(moeda, value)); },
  fetchGasto: (spent) => { dispatch(fetchSpent(spent)); },
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getcurrencies: PropTypes.func.isRequired,
  fetchGasto: PropTypes.func.isRequired,
  currencies: PropTypes.node.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
