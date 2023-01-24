import { HANDLE_CHANGE, LOGIN_USER, LOGOUT_USER } from '../action.js';

const user_reducer = (state, action) => {
  if (action.type === HANDLE_CHANGE) {
    const { name, value } = action.payload;
    return { ...state, user_inputs: { ...state.user_inputs, [name]: value } };
  }

  if (action.type === LOGIN_USER) {
    const {
      user: { name },
      token
    } = action.payload;
    return {
      ...state,
      name,
      token,
      user_inputs: {
        name: '',
        email: '',
        password: ''
      }
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      name: '',
      token: ''
    };
  }

  throw new Error(`Pas d'action correspondante ${action.type}`);
};

export default user_reducer;
