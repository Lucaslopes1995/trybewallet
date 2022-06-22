import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    this.fetchAPI();
  }

    fetchAPI = async () => {
      const { getcurrencies } = this.props;
      const currencie = await getcurrencies();
      return currencie;
    }

    render() {
      const { email } = this.props;
      return (
        <div>

          <Header />
          <p>{email}</p>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getcurrencies: () => { dispatch(fetchCurrencies()); },
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getcurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
