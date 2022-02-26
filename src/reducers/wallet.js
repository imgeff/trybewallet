import { DATA_EXPENSE, REMOVE_EXPENSE, CALCULATE_VALUE, EDIT_EXPENSE,
  CATCH_EXPENSES } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  totalValue: 0,
};

const calculateValueExpenses = (expenses) => {
  let totalValue = 0;
  expenses.forEach((expense) => {
    const { value, currency, exchangeRates } = expense;
    const cambio = exchangeRates[currency].ask;
    const convertedValue = parseFloat(value) * parseFloat(cambio);
    totalValue += convertedValue;
  });
  return totalValue.toFixed(2);
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { expense, indexExpense } = action;
  switch (action.type) {
  case DATA_EXPENSE:
    state = {
      ...state,
      expenses: [...state.expenses, { ...action.expense, id: state.expenses.length + 1 }],
    };
    localStorage.setItem('state', JSON.stringify(state));
    return state;

  case REMOVE_EXPENSE:
    state = {
      ...state,
      expenses: [...action.filteredExpenses],
    };
    localStorage.setItem('state', JSON.stringify(state));
    return state;

  case CALCULATE_VALUE:
    state = {
      ...state,
      totalValue: Math.abs(
        action.operation === '+' ? (state.totalValue + Number(action.value)).toFixed(2)
          : (state.totalValue - action.value).toFixed(2),
      ),
    };
    localStorage.setItem('state', JSON.stringify(state));
    return state;

  case EDIT_EXPENSE:
    state.expenses[indexExpense] = expense;
    state = { ...state, totalValue: calculateValueExpenses(state.expenses) };
    localStorage.setItem('state', JSON.stringify(state));
    return state;

  case CATCH_EXPENSES:
    state = { ...state, expenses: action.expenses, totalValue: action.totalValue };
    return state;

  default:
    return state;
  }
};

export default walletReducer;
