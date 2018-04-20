import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  message: 'Hello'
 };

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state, email: action.payload
      };
    case PASSWORD_CHANGED:
      return {
        ...state, password: action.payload
      };
    case LOGIN_USER:
      return {
        ...state, loading: true, error: ''
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state, user: action.payload, error: '', loading: false, email: '', password: ''
      };
    case LOGIN_USER_FAIL:
      return {
        ...state, error: 'Authentication Failed', password: '', loading: false
      };
    case CREATE_USER:
        return {
          ...state, loading: true, error: 'Please Input Your Info.'
        };
    case CREATE_USER_SUCCESS:
      return {
        ...state, user: action.payload, error: `${action.message}`, loading: false, email: '', password: ''
      };
    case CREATE_USER_FAIL:
      return {
        ...state, error: `${action.message}`, loading: false, password: ''
      };

    default:
      return state;
  }
};
