import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
         PASSWORD_CHANGED,
         LOGIN_USER_SUCCESS,
         LOGIN_USER_FAIL,
         LOGIN_USER,
         CREATE_USER,
         CREATE_USER_FAIL,
         CREATE_USER_SUCCESS,
       } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};


export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

// 当且仅当request complete之后，user 才可以login，所以是个异步方法
// 利用redux thunk完成异步请求，return 一个dispatch 的方法给thunk，然后给它一个run的条件即可
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};


export const createUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => createUserSuccess(dispatch, user))
      .catch(error => createUserFail(dispatch, error));
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const createUserFail = (dispatch, error) => {
  dispatch({
    type: CREATE_USER_FAIL,
    message: `${error.message}`
   });
};

const createUserSuccess = (dispatch, user) => {
  //Alert.alert("Info", "Create User: " + user.uid);
  dispatch({ 
    type: CREATE_USER_SUCCESS,
    message: "UserID: " + user.uid,
    payload: user
  });
};
