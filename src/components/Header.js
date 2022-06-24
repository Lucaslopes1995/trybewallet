import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css'
import logo from '../images/trybe.png'
import { converteMoeda } from '../actions';

class Header extends React.Component {
	state = {moeda:'BRL'};

	setTotal = () => {
		const {moeda} = this.state
		const {gastos} = this.props
		let a;
		if(moeda ==="BRL"){
			return a = gastos?.reduce((ant, at) => (
				ant + parseFloat(at?.exchangeRates[[at.currency]].ask)
		  * parseFloat(at?.value)
			  ), 0);
		}
		return a = gastos?.reduce((ant, at) => (
			ant + (parseFloat(at?.exchangeRates[[at.currency]].ask)
			/(parseFloat(at?.exchangeRates[[moeda]].ask))
			)
	  * parseFloat(at?.value)
		  ), 0);
	}

  render() {
    const { email, gastos, mudaMoeda, currencies } = this.props;


    // const cot = parseFloat(gastos[0]?.exchangeRates[[gastos[0].currency]].ask);
    // const num = parseFloat(gastos[0]?.value);
    // console.log(total);
	const valortotal = this.setTotal()
	// console.log(valortotal)


    // console.log(cot, num, valortotal);

    // const valorTotal =
    return (
      <header>
		<div className='div-logo'><img src={logo} alt="logo"/></div>
		<div className='content-header'>
			<div className='login-email'>
			<span data-testid="email-field">{email}</span>

			</div>
			<span>Despesa Total </span>
			<div className='valor-content'>
				<p data-testid="total-field">{valortotal?.toFixed(2) || 0}</p>
				<select onChange={({target})=>{mudaMoeda(target.value);this.setState({moeda:target.value})}}>
				<option>BRL</option> 
				{currencies && currencies?.map((el,index)=>((
					<option key={index+el.value}>{el}</option> 
				)))}
				</select>
			</div>
			
		</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  gastos: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
	mudaMoeda: (moeda) => dispatch(converteMoeda(moeda))
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  gastos: PropTypes.string.isRequired,
  mudaMoeda: PropTypes.func.isRequired,
  currencies: PropTypes.node.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
