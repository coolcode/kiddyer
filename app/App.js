/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Actions, Router, Stack, Scene} from 'react-native-router-flux';
import Login from './pages/Login';
import MyWeb from './pages/MyWeb';
import FetchExample from './pages/FetchExample';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login"
            component={Login}
            title="Login"
            rightTitle="MyWeb"
            onRight={() => Actions.home()}
            />
          <Scene key="register" component={MyWeb} title="Register"/>
          <Scene key="home" component={FetchExample} title="Fetch"/>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
