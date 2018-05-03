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
import {Polyline, Marker, Callout} from 'react-native-maps';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export default class LocationHistoryToMap extends Component {
  constructor(props){
    super(props);

    this.histRef = firebase.database().ref(`location_history/${this.props.uid}`).limitToLast(100);
    this.state = {
      loading: true,
      region: {
        latitude: -33.8885795,
        longitude: 151.1851586,
      },
      markers: [],
      coords: []
    };  
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {

      const { width, height } = Dimensions.get('window');
      const ratio = width / height;
   
      this.histRef.once('value', groups => {
        var coords = [];
        var markers = [];
        var lat = 0;
        var lng = 0;
        groups.forEach( item=> { 
          var val = item.val();
          lat = val.lat;
          lng = val.lng;
          var coord ={
            latitude: val.lat, 
            longitude: val.lng, 
            title: val.created 
          };
          markers.push({ 
            coordinate: coord,
            title: `${val.created}`
            });
          coords.push(coord);
          console.log(`d:${val.created}`);
        });
        
        if(coords.length==0){     
          this.setState({
            loading: false,
            message:'No Data'
          });
          return;
        }

        var lastCoord = coords[coords.length-1];
        //only keep last marker
        markers = [];
        markers.push({ 
          coordinate: {
            latitude: lastCoord.latitude,
            longitude: lastCoord.longitude
          },
          title: `${lastCoord.title}`
          });
 
        //state        
        this.setState({
          loading: false,
          region: {
            latitude: lastCoord.latitude,
            longitude: lastCoord.longitude, 
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0222 * ratio,
          },
          markers:markers,
          coords: coords
        });  
        //end state
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
            ) : 
              (this.state.message? (
                <Title style={{ color: 'black' }}>{this.state.message}</Title>
              ):(
              <MapView
                style={styles.map}
                region={this.state.region} 
                followsUserLocation
                loadingEnabled
              >
              <Polyline
                coordinates={this.state.coords}
                strokeColor="green" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                  'green'
                ]}
                strokeWidth={4}
              />
              {this.state.markers.map((marker, key) =>
                 this.renderMaker(marker, key)
              )}
              </MapView>                
              )
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
