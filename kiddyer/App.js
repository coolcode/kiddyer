import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Container } from 'native-base';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './src/Router';
import reducers from './src/reducers';
import ignoreWarnings from 'react-native-ignore-warnings';

//gmap: AIzaSyDuAKhfwvK2xPn7qJTdQiHNZqirWZpgvGQ
export default class App extends React.Component {

componentWillMount() {
  const firebaseConf_Will = {
    apiKey: 'AIzaSyACti3poX0jG2tGD6cS-uZ25fDgHwDMorw',
    authDomain: 'kiddyer-capstone.firebaseapp.com',
    databaseURL: 'https://kiddyer-capstone.firebaseio.com',
    projectId: 'kiddyer-capstone',
    storageBucket: '',
    messagingSenderId: '226025468668'
  };

  const firebaseConf_Bruce = {
    apiKey: 'AIzaSyB7tQOQDyedWRypB4e301jHgzYPBJYf9wM',
    authDomain: 'kiddyer-1521547598504.firebaseapp.com',
    databaseURL: 'https://kiddyer-1521547598504.firebaseio.com',
    projectId: 'kiddyer-1521547598504',
    storageBucket: '',
    messagingSenderId: '226025468668'
  };

  firebase.initializeApp(firebaseConf_Bruce);
}


render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Container>
          <Router />
        </Container>
      </Provider>
    );
  }

}
