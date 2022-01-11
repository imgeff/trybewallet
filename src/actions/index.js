import fetchApi from '../services/fetchApi';
// ============== ACTION TYPES ===============
export const DATA_LOGIN = 'DATA_LOGIN';
export const DATA_EXPENSE = 'DATA_EXPENSE';

// ============== ACTION CREATORS ================
export const dataLogin = (data) => ({
  type: DATA_LOGIN,
  data,
});

export const dataExpense = (expense) => ({
  type: DATA_EXPENSE,
  expense,
});

export const fetchAPICoin = (expense) => (dispatch) => {
  fetchApi()
    .then((data) => dispatch(dataExpense({ ...expense, exchangeRates: data })));
};
