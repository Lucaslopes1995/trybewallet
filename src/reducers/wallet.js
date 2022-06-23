// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCIES_SUCCESS, FETCH_CURRENCIES_FAIL, ADDSPENT } from '../actions';

const INITIAL_STATE = {
  currencies: '',
  eror: '',
  ask: 0,
  valor: 0,
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case FETCH_CURRENCIES_FAIL:
    return {
      ...state,
      eror: action.payload,
    };
  case ADDSPENT:
    return {
      ...state,
      ask: parseFloat(action.payload.cotacao) * parseFloat(action.payload.data.value)
+ parseFloat(state.ask),
      expenses: [...state.expenses, { ...action.payload.data,
        id: state.expenses.length }],
    };
  default:
    return state;
  }
};

export default wallet;
