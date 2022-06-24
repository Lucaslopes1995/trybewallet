import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendLogin } from '../actions';
import './Login.css'
import carteira from '../images/carteira.ico'

const QTD_CHARACTERES = 6;

class Login extends React.Component {
    state = {
      email: '',
      senha: '',
	  showMessagepass: false,
	  showMessageEmail: false
    }

	validMessages = () => {
		
		const { email, senha } = this.state;
		
		const exRegEmail = /^.+@.+\..+$/.test(email);

		this.setState({showMessageEmail:!exRegEmail})
		this.setState({showMessagepass:senha.length < QTD_CHARACTERES})
		

	}

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value },this.validMessages);
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
	  const {showMessagepass, showMessageEmail} = this.state;
      const validButton = this.validButton();
      return (
        <div className='container-home'>
          <form onSubmit={ this.handleSumit }>
			<div className='carteira-login'>
				<img src={carteira} alt="carteira"/>
			</div>
			

            <label htmlFor="email-home">
              Email
              <input
                name="email"
				autoComplete='off'
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
				autoComplete='off'
                value={ senha }
                onChange={ this.handleChange }
                type="password"
                data-testid="password-input"
                id="senha-home"
              />

            </label>

			<div className='message-button'>
				<div className='text-login'>

					{showMessageEmail && <span>O email precisa ser no seguinte formato "exemplo123@exemplo.com"</span>}
					{showMessagepass && <span>A senha precisa ter 6 dígitos</span>}
					
				</div>
				
				<button
				type="submit"
				disabled={ validButton }
				>
				Entrar

				</button>
			</div>
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
