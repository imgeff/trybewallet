import { DATA_LOGIN } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DATA_LOGIN:
    return { email: action.data };
  default:
    return state;
  }
};

export default userReducer;
