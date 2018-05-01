import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    GROUPNAME_CHANGED,
    CREATE_MEMBERGROUP,
    CREATE_MEMBERGROUP_SUCCESS,
    CREATE_MEMBERGROUP_FAIL,
    GROUP_MANAGE,
    DELETE_MEMBER,
} from './types';
//import cryptoRandomString from 'crypto-random-string';

export const loadData = (id) => {
  return (dispatch) => {
    //dispatch({ type: CREATE_MEMBERGROUP });
    const user = firebase.auth().currentUser;
    this.groupsRef = firebase.database().ref(`member_group/${user.uid}/${id}`)
    .on('value', (snapshot) =>{
        const val = snapshot.val();
        if(!val){
          return;
        }
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

// manage member
export const loadData2 = (id) => {
  return (dispatch) => {
    //dispatch({ type: CREATE_MEMBERGROUP });
    const user = firebase.auth().currentUser;
    this.groupsRef = firebase.database().ref(`member_group/${user.uid}/${id}`)
    .on('value', (snapshot) =>{
        const val = snapshot.val();
        if(!val){
          return;
        }
        console.log(val);
        console.log(snapshot);
        dispatch({
          type: GROUP_MANAGE,
          groupName: val.groupName,
          groupCode: val.groupCode,
          members: val.members,
        });
    });
  };
};

export const deleteMember = (id, index) => {
  return (dispatch) => {
    dispatch({ type: DELETE_MEMBER });

    const user = firebase.auth().currentUser;
    const member1 = firebase.database().ref(`member_group/${user.uid}/${id}/members/${index}`);
    const member2 = firebase.database().ref(`member_join/${user.uid}/${id}/members/${index}`);
    member1.remove();
    member2.remove();

    Actions.refresh();
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

      let updates = {};

      console.log(`id:${id}`);
      if(id){
        key = id;
        var groupsRef = firebase.database().ref('groups/'+id);
        groupsRef.once('value', group => {
           data =  group.val();
           data.groupName = groupName;
          updates['/groups/' + key] = data;
          updates['/member_group/' + user.uid + '/'+ key] = data;
          firebase.database().ref().update(updates);
        });

      }else{
        updates['/groups/' + key] = data;
        updates['/member_group/' + user.uid + '/'+ key] = data;
        firebase.database().ref().update(updates);
      }

      //dispatch({ type: CREATE_MEMBERGROUP_SUCCESS, message: 'Saved!' });

      Actions.family();
    };
};
