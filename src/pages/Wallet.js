import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addSpent, fetchCurrencies } from '../actions';

class Wallet extends React.Component {
   state={
     valor: '',
     descricao: '',
     moeda: 'moeda',
     metodoPagamento: '',
     tag: '',
   }

   componentDidMount() {
     this.fetchAPI();
   }

    fetchAPI = async () => {
      const { getcurrencies } = this.props;
      const currencie = await getcurrencies();
      return currencie;
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      const { setSpent } = this.props;
      e.preventDefault();
      //   console.log(dispatch);
      setSpent(this.state);
    }

    render() {
      const { email, currencies } = this.props;
      //   console.log(currencies);
      const { valor, descricao, moeda, metodoPagamento, tag } = this.state;
      return (
        <div>

          <Header />
          <div>
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="valor">
                Valor
                <input
                  data-testid="value-input"
                  name="valor"
                  value={ valor }
                  onChange={ this.handleChange }
                  id="valor"
                />
              </label>

              <select
                name="moeda"
                value={ moeda }
                onChange={ (e) => this.setState({ moeda: e.target.value }) }
              >
                <option hidden>Moeda</option>
                {currencies && currencies.map((el, index) => (
                  <option key={ el + index }>{el}</option>
                ))}
              </select>

              <select
                value={ metodoPagamento }
                onChange={ (e) => this.setState({ metodoPagamento: e.target.value }) }
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

              <label htmlFor="descricao">

                <input
                  data-testid="description-input"
                  name="descricao"
                  value={ descricao }
                  onChange={ this.handleChange }
                  id="descricao"
                />
              </label>

              <button
                type="submit"
              >
                Adicionar

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
  getcurrencies: () => { dispatch(fetchCurrencies()); },
  setSpent: (spent) => { dispatch(addSpent(spent)); },
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getcurrencies: PropTypes.func.isRequired,
  setSpent: PropTypes.func.isRequired,
  currencies: PropTypes.node.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
