import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Form, Item, Input } from 'native-base';
import MapView from 'react-native-maps';

export default class Gmap extends Component { 

  constructor(props) {
    super(props);
    this.state = { 
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      } 
    };
  }
  
  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  
  onRegionChange(region) {
    this.setState({ region });
  }
  
  render() {
    return (
      <MapView
        
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      />
    );
  }
   
}
