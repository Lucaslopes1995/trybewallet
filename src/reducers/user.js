// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SEND_USER_DATA } from '../actions';

const INITIAL_STATE = {
  email: '',
  senha: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_DATA:
    return {
      ...state,
      email: action.payload.email,
      senha: action.payload.senha,
    };
  default:
    return state;
  }
};

export default user;
