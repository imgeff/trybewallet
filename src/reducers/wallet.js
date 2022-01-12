import { DATA_EXPENSE, REMOVE_EXPENSE } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DATA_EXPENSE:
    return {
      expenses: [...state.expenses, { ...action.expense }],
    };
  case REMOVE_EXPENSE:
    state.expenses.splice(state.expenses.indexOf(action.expense), 1);
    return { expenses: [...state.expenses] };
  default:
    return state;
  }
};

export default walletReducer;
