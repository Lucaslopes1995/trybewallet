// Coloque aqui suas actionss
export const SEND_USER_DATA = 'sendUserData';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAIL = 'FETCH_CURRENCIES_FAIL';
export const ADDSPENT = 'add_spent';
export const DELETEELDESPESA = 'deleteElDespesa';
export const LIBERAEDITDESPESA = 'LIBERAEDITDESPESA';
export const ENVIAEDITDESPESA = 'ENVIAEDITDESPESA';
export const MUDAMOEDA = 'MUDAMOEDA';

const sucessFetch = (currencies, cotacao = 0, valor = 0) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload: { currencies, cotacao, valor },
});

const failFetch = (error) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload: error,
});

export const addSpent = (spent) => ({
  type: ADDSPENT,
  payload: spent,
});

export const fetchCurrencies = (cotacao = '', va = 0) => async (dispatch) => {
  try {
    console.log(cotacao);
    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const re = await currencies?.json();
    if (re) {
      delete re.USDT;
      const response = Object.values(re).map((moeda) => moeda.code);
      //   console.log(re);
      const cotacao1 = cotacao ? re[cotacao] || 0 : 0;
      const valor = va || 0;

      dispatch(sucessFetch(response, cotacao1?.ask, valor));
    // console.log(response);
    }
  } catch (error) {
    dispatch(failFetch(error));
    console.log(error);
  }
};

export const fetchSpent = (spent) => async (dispatch) => {
  try {
    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const re = await currencies?.json();
    if (re) {
      delete re.USDT;
      //   console.log(re);
      const cotacao = re[spent.currency].ask || 0;
      //   console.log(re);
      //   console.log(spent.currency);
      //   console.log(cotacao);

      const arrobj = {
        cotacao,
        data: { ...spent,
          exchangeRates: re },
      };

      dispatch(addSpent(arrobj));
    // console.log(response);
    }
  } catch (error) {
    dispatch(failFetch(error));
    console.log(error);
  }
};

export const deleteElDespesa = (despesa, todasDespesas) => {
  const a = todasDespesas.filter((desp) => desp.id !== despesa.id);
  console.log(a);
  return {
    type: DELETEELDESPESA,
    payload: { despesa, a },
  };
};

export const liberaEditElDespesa = (despesa, todasDespesas) => {
//   const a = todasDespesas.filter((desp) => desp.id !== despesa.id);
  const a = todasDespesas;
  return {
    type: LIBERAEDITDESPESA,
    payload: { despesa, a },
  };
};

export const converteMoeda = (moeda) => {
	console.log(moeda)
  return {
    type: MUDAMOEDA,
    payload: moeda,
  };
};

export const enviaEditElDespesa = (despesa, todasDespesas) => {
	const a = todasDespesas?.filter((desp) => desp.id !== despesa.id);
	return {
	  type: ENVIAEDITDESPESA,
	  payload: { despesa, a },
	};
  };



export const sendLogin = (user) => ({
  type: SEND_USER_DATA,
  payload: user,
});
