import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, gastos } = this.props;
    // const cot = parseFloat(gastos[0]?.exchangeRates[[gastos[0].currency]].ask);
    // const num = parseFloat(gastos[0]?.value);
    // console.log(total);

    const valortotal = gastos?.reduce((ant, at) => (
      ant + parseFloat(at?.exchangeRates[[at.currency]].ask)
* parseFloat(at?.value)
    ), 0);
    // console.log(cot, num, valortotal);

    // const valorTotal =
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span>Despesa Total </span>
        <span data-testid="total-field">{valortotal?.toFixed(2) || 0}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  gastos: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  gastos: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
