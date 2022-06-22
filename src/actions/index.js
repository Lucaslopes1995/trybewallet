// Coloque aqui suas actionss
export const SEND_USER_DATA = 'sendUserData';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CURRENCIES_FAIL = 'FETCH_CHARACTERS_FAIL';
export const ADDSPENT = 'add_spent';

const sucessFetch = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload: currencies,
});

const failFetch = (error) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload: error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const re = await currencies?.json();
    if (re) {
      delete re.USDT;
      const response = Object.values(re).map((moeda) => moeda.code);

      dispatch(sucessFetch(response));
    // console.log(response);
    }
  } catch (error) {
    dispatch(failFetch(error));
    console.log(error);
  }
};

export const addSpent = (spent) => ({
  type: ADDSPENT,
  payload: spent,
});

export const sendLogin = (user) => ({
  type: SEND_USER_DATA,
  payload: user,
});
