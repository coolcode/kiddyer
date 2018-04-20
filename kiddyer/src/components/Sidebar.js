/* @flow */

import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Sidebar extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Menu</Text>       
        <Button style={styles.button} block primary><Text> User Profile </Text></Button>
        <Button style={styles.button} block light onPress={() => Actions.familyList()}><Text> Manage Member Group</Text></Button>
        <Button style={styles.button} block light><Text> Message</Text></Button>
        <Button style={styles.button} block light><Text> Location History</Text></Button>
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
    marginTop: 10,
    marginLeft: 10,
    fontSize: 36,
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
