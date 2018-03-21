import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from 'native-base';
import Router from './src/Router';
//gmap: AIzaSyDuAKhfwvK2xPn7qJTdQiHNZqirWZpgvGQ
export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Router />
      </Container>
    );
  }

}
