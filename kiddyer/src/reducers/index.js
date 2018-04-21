import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FamilyReducer from './FamilyReducer';

export default combineReducers({
  auth: AuthReducer,
  famy: FamilyReducer,
});
