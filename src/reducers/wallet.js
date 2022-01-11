import { DATA_EXPENSE } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expense: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DATA_EXPENSE:
    return {
      expense: [...state.expense, { ...action.expense }],
    };
  default:
    return state;
  }
};

export default walletReducer;
