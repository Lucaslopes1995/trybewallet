import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendLogin } from '../actions';
import './Login.css'

const QTD_CHARACTERES = 6;

class Login extends React.Component {
    state = {
      email: '',
      senha: '',
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    validButton = () => {
      const { email, senha } = this.state;
      const exRegEmail = /^.+@.+\..+$/.test(email);
      let aux = true;
      if (exRegEmail && senha.length >= QTD_CHARACTERES) {
        aux = false;
      }
      return aux;
    }

    handleSumit = (e) => {
      const { email, senha } = this.state;
      const { login, history } = this.props;
      e.preventDefault();
      login({ email, senha });
      history.push('/trybewallet/carteira');
    }

    render() {
      const { email, senha } = this.state;
      const validButton = this.validButton();
      return (
        <div className='container-home'>
          <form onSubmit={ this.handleSumit }>

            <label htmlFor="email-home">
              Email
              <input
                name="email"
                value={ email }
                onChange={ this.handleChange }
                type="email"
                data-testid="email-input"
                id="email-home"
              />

            </label>
            <label htmlFor="senha-home">
              senha
              <input
                name="senha"
                value={ senha }
                onChange={ this.handleChange }
                type="password"
                data-testid="password-input"
                id="senha-home"
              />

            </label>
            <button
              type="submit"
              disabled={ validButton }
            >
              Entrar

            </button>
          </form>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  login: (userdata) => { dispatch(sendLogin(userdata)); },
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.node.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
