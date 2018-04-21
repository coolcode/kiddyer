import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CURRENT_PASSWORD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  email: 'bruce@test.com',
  password: '123456',
  currentPassword: '',
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
    case CURRENT_PASSWORD:
      return {
        ...state, currentPassword: action.payload
      };
    case LOGIN_USER:
      return {
        ...state, loading: true, error: ''
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state, user: action.payload, error: '', loading: false, password: ''
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
        ...state, user: action.payload, error: `${action.message}`, loading: false, password: ''
      };
    case CREATE_USER_FAIL:
      return {
        ...state, error: `${action.message}`, loading: false, password: ''
      };
    case UPDATE_USER:
      return {
        ...state, loading: true, error: ''
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state, loading: false, user: action.payload, password: '', error: 'Update Success'
      };
    case UPDATE_USER_FAIL:
      return {
        ...state, loading: false, password: '', error: 'Update Failed'
      };

    default:
      return state;
  }
};
