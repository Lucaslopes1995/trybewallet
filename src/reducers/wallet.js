// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCIES_SUCCESS, FETCH_CURRENCIES_FAIL, ADDSPENT,
  DELETEELDESPESA, LIBERAEDITDESPESA, ENVIAEDITDESPESA } from '../actions';

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
    console.log(state.expenses[state.expenses.length - 1]?.id + 1);
    return {
      ...state,
      ask: parseFloat(action.payload.cotacao) * parseFloat(action.payload.data.value)
+ parseFloat(state.ask),
      expenses: [...state.expenses, { ...action.payload.data,
        id: state.expenses[state.expenses.length - 1]?.id + 1 || 0 }],
    };
  case DELETEELDESPESA:
    console.log((action.payload.despesa
      .exchangeRates[action.payload.despesa.currency].ask));
    return {
      ...state,
      ask: parseFloat(state.ask) - parseFloat(action.payload.despesa.value)
* (action.payload.despesa
  .exchangeRates[action.payload.despesa.currency].ask),
      expenses: [...action.payload?.a],
    };
  case LIBERAEDITDESPESA:
    return {
      ...state,
      expenses: [...action.payload?.a],
    };
  case ENVIAEDITDESPESA:
    return {
      ...state,
      expenses: [...action.payload.a, action.payload.despesa]
        .sort((a, b) => a.id - b.id),
    };
  default:
    return state;
  }
};

export default wallet;
