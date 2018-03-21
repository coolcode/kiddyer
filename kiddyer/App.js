import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Actions, Router, Stack, Scene} from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import WebViewExample from './components/WebViewExample';
import FetchExample from './components/FetchExample';
import Gmap from './components/Gmap';
//gmap: AIzaSyDuAKhfwvK2xPn7qJTdQiHNZqirWZpgvGQ
export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  // async componentWillMount() {
  //   await Expo.Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //     Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
  //   });
  //   this.setState({ loading: false });
  // }

  render() {
    if (this.state.loading) {
      // return <Expo.AppLoading />;
    }
    return (
      <Router>
        <Stack key="root">
          <Scene key="login"
            component={Login}
            title="Login"
            rightTitle="Gmap"
            onRight={() => Actions.gmap()}
            />
          <Scene key="gmap" component={Gmap} title="Gmap"
              rightTitle="WebView"
              onRight={() => Actions.webview()} />
          <Scene key="webview" component={WebViewExample} title="WebView" 
              rightTitle="Fetch"
              onRight={() => Actions.fetch()} />
          <Scene key="fetch" component={FetchExample} title="Fetch"/>
        </Stack>
      </Router>
    );
  }

}