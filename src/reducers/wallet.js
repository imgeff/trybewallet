import { DATA_EXPENSE, REMOVE_EXPENSE, SUM_VALUE } from '../actions';
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
    state.expenses.splice(state.expenses.indexOf(action.expense), 1);
    return { expenses: [...state.expenses] };
  case SUM_VALUE:
    return {
      ...state,
      totalValue: state.totalValue + Number(action.value),
    };
  default:
    return state;
  }
};

export default walletReducer;
