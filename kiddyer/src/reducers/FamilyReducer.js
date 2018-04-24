import {
    GROUPNAME_CHANGED,
    CREATE_MEMBERGROUP,
    CREATE_MEMBERGROUP_SUCCESS,
    CREATE_MEMBERGROUP_FAIL
  } from '../actions/types';
  
  const INITIAL_STATE = {
    groupName: '',
    groupCode: '',
    key: '',
    user: null,
    error: '',
    loading: false,
    message: ''
   };
  
  export default (state = INITIAL_STATE, action) => {
    console.log(action);
  
    switch (action.type) { 
      case GROUPNAME_CHANGED:
        return {
            ...state, groupName: action.groupName, groupCode: action.groupCode
        };
      case CREATE_MEMBERGROUP:
          return {
            ...state, loading: true, error: '', key: action.key, groupName: action.groupName, groupCode: action.groupCode
          };
      case CREATE_MEMBERGROUP_SUCCESS:
        return {
          ...state, error: `${action.message}`, loading: false, groupName: ''
        };
      case CREATE_MEMBERGROUP_FAIL:
        return {
          ...state, error: `${action.message}`, loading: false
        };
   
      default:
        return state;
    }
  };
  