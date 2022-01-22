import { DATA_EXPENSE, REMOVE_EXPENSE, CALCULATE_VALUE, EDIT_EXPENSE } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  totalValue: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DATA_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expense }],
    };
  case REMOVE_EXPENSE:
    return { ...state, expenses: [...action.filteredExpenses] };
  case CALCULATE_VALUE:
    return {
      ...state,
      totalValue: Math.abs(
        action.operation === '+' ? state.totalValue + Number(action.value)
          : state.totalValue - action.value,
      ),
    };
  case EDIT_EXPENSE:
    state.expenses.action.indexExpense = action.expense;
    return state;
  default:
    return state;
  }
};

export default walletReducer;
