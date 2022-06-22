// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { FETCH_CURRENCIES_SUCCESS, FETCH_CURRENCIES_FAIL, ADDSPENT } from '../actions';

const INITIAL_STATE = {
  currencies: '',
  eror: '',
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case FETCH_CURRENCIES_FAIL:
    return {
      ...state,
      eror: action.payload,
    };
  case ADDSPENT:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
