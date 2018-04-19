/* @flow */

import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import firebase from 'firebase';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Sidebar extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Menu</Text>
        <Image
          source={require('./img3.jpeg')}
          style={styles.topimage}
        />
        <Button style={styles.button} block light><Text> Light </Text></Button>
        <Button style={styles.button} block primary><Text> Primary </Text></Button>
        <Button style={styles.button} block warning><Text> Warning </Text></Button>
        <Button
          style={styles.button} block danger
          onPress={() => Actions.auth()}
        ><Text> Logout </Text></Button>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginRight: 5
  },
  text: {
    color: '#fff',
    marginTop: 50,
    marginLeft: 10,
  },
  topImage: {
    width: '100%',
    height: 100,
    margin: 10,
    opacity: 0.7,
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});
