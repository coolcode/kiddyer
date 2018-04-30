import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SignupSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Actions.register()}>
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Contact with us</Text>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});
