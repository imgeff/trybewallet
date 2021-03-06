import fetchApi from '../services/fetchApi';
// ============== ACTION TYPES ===============
export const DATA_LOGIN = 'DATA_LOGIN';
export const DATA_EXPENSE = 'DATA_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const CALCULATE_VALUE = 'CALCULATE_VALUE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CATCH_EXPENSES = 'CATCH_EXPENSES';
// ============== ACTION CREATORS ================
export const editExpense = (expense, indexExpense) => ({
  type: EDIT_EXPENSE,
  expense,
  indexExpense,
});

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
    .then((data) => {
      const rateBRL = {
        code: 'BRL',
        codein: 'BRL',
        name: 'Real/Real Brasileiro',
        ask: '1',
      };
      data.BRL = rateBRL;
      dispatch(dataExpense({ ...expense, exchangeRates: data }));
    });
};

export const catchStorageExpenses = (expenses, totalValue) => ({
  type: CATCH_EXPENSES,
  expenses,
  totalValue,
});

export const removeExpense = (filteredExpenses) => ({
  type: REMOVE_EXPENSE,
  filteredExpenses,
});

export const calculateValue = (value, operation) => ({
  type: CALCULATE_VALUE,
  value,
  operation,
});
