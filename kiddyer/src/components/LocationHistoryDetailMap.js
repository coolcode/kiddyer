import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  InteractionManager,
  TouchableOpacity,TouchableHighlight
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Form,
  Label,
  Input,
  Item,
  Button,
  Icon,
  Card, CardItem, Text, Body, Left, Thumbnail, Image
} from 'native-base';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export default class LocationHistoryDetailMap extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      region: {
        latitude: -33.8885795,
        longitude: 151.1851586,
      },
      markers: [],
    };  
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {

      const { width, height } = Dimensions.get('window');
      const ratio = width / height;

      this.setState({
        loading: false,
        region: {
          latitude: this.props.lat,
          longitude: this.props.lng, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922 * ratio,
        },
        markers:[{
          key: 'marker1',
          /*opera house */
          coordinate:{
            latitude: this.props.lat,
            longitude: this.props.lng, 
          },
          title: '',
          description: ``
          }
        ]
      });  
    }); 
  }  
 
  renderMaker(marker, key){
    console.log(`marker: ${marker.key}, ${marker.title}`);

   return (
    <Marker
      key={key}
      coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}
      image={require("../assets/img/kid.png")}  
    > 
    </Marker>);
  }

  render() {

    const { width, height } = Dimensions.get('window');
    const ratio = width / height;

    return (
      <Container> 
         <Content scrollEnabled={false}>
          <View style={{ width, height }}>
            {this.state.loading ? (
              <Loading />
            ) : (
              <MapView
                style={styles.map}
                region={this.state.region} 
                followsUserLocation
                loadingEnabled
              >
              {this.state.markers.map((marker, key) =>
                 this.renderMaker(marker, key)
              )}
              </MapView>
            )}
          </View>
        </Content> 
      </Container>
    );
  }
}

const Loading = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    marginTop: 1.5,
    ...StyleSheet.absoluteFillObject,
  },
});
