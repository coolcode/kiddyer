import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebViewExample extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'http://blog.kiddyer.com/'}}
        style={{marginTop: 20}}
      />

    );
  }
}
