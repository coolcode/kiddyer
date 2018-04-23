import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    GROUPNAME_CHANGED,
    CREATE_MEMBERGROUP, 
    CREATE_MEMBERGROUP_SUCCESS, 
    CREATE_MEMBERGROUP_FAIL
} from './types';
//import cryptoRandomString from 'crypto-random-string';

export const loadData = (id) => {
  return (dispatch) => {    
    //dispatch({ type: CREATE_MEMBERGROUP });  
    const user = firebase.auth().currentUser;      
    this.groupsRef = firebase.database().ref(`member_group/${user.uid}/${id}`)
    .on('value', (snapshot) =>{
        const val = snapshot.val();
        console.log(val);
        console.log(snapshot);
        dispatch({ 
          type: GROUPNAME_CHANGED,
          groupName: val.groupName,
          groupCode: val.groupCode,
        });
    });
  };
};


export const groupNameChanged = (text) => {
    return (dispatch) => {
      dispatch({ 
        type: GROUPNAME_CHANGED,
        groupName: text
      });
    };
  };

  
export const createMemberGroup = ({ id, groupCode, groupName }) => {
    return (dispatch) => {
      dispatch({ type: CREATE_MEMBERGROUP });  

      const user = firebase.auth().currentUser;
      let randcode = Math.random().toString(36).slice(-6);
      if(groupCode){
        randcode = groupCode;
      }
      let data = { 
        groupName: groupName,
        groupCode: randcode,
        user: {uid: user.uid, email: user.email}
      };

      let key = firebase.database().ref().child('groups').push().key;
      if(id){
        key = id;
      }
      let updates = {};
      updates['/groups/' + key] = data;
      updates['/member_group/' + user.uid + '/'+ key] = data;
      firebase.database().ref().update(updates);

      //dispatch({ type: CREATE_MEMBERGROUP_SUCCESS, message: 'Saved!' });  

      Actions.family();
    };
};
