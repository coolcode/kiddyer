import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    GROUPNAME_CHANGED,
    CREATE_MEMBERGROUP, 
    CREATE_MEMBERGROUP_SUCCESS, 
    CREATE_MEMBERGROUP_FAIL
} from './types';
//import cryptoRandomString from 'crypto-random-string';

export const groupNameChanged = (text) => {
    return (dispatch) => {
      dispatch({ 
        type: GROUPNAME_CHANGED,
        groupName: text
      });
    };
  };

  
export const createMemberGroup = ({ groupKey, groupName }) => {
    return (dispatch) => {
      dispatch({ type: CREATE_MEMBERGROUP });  

      const user = firebase.auth().currentUser;
      const randcode = Math.random().toString(36).slice(-6);
      let data = { 
        groupName: groupName,
        groupCode: randcode
      };
      
      let key = firebase.database().ref().child('groups').push().key;
      if(groupKey){
        key = groupKey;
      }
      let updates = {};
      updates['/groups/' + key] = data;
      updates['/member_group/' + user.uid + '/'+ key] = data;
      firebase.database().ref().update(updates);

      //dispatch({ type: CREATE_MEMBERGROUP_SUCCESS, message: 'Saved!' });  

      Actions.family();
    };
};
