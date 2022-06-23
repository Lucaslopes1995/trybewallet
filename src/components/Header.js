import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    // console.log(this.props);
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span>Despesa Total </span>
        <span data-testid="total-field">{total.toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.ask,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
