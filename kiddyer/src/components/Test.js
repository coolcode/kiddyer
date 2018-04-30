import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MapView from 'react-native-maps';

export default class Test extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
          <MapView
          style={styles.map} initialRegion={{
            latitude: -33.888340,
            longitude: 151.187342,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          >
              <MapView.Marker
               coordinate={{
                latitude: -33.888340,
                longitude: 151.187342,
              }}
              >

              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
              </MapView.Marker>

              <MapView.Marker
               coordinate={{
                latitude: -33.891495,
                longitude: 151.198701,
              }}
              />
          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'

  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'

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
