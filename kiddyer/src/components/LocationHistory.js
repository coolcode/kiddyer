/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class LocationHistory extends Component {


  render() {
      return (
        <View style={styles.container}>
          <Text>{this.props.id}</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 50,
    height: 50
  },
});
