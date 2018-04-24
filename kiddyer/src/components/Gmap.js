import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  InteractionManager,
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


export default class Gmap extends Component { 
  constructor(props){
    super(props);
    
    this.state = {
      loading: true,
      region: {
        latitude: -33.8885795,
        longitude: 151.1851586, 
      },
      markers: [{
        key: "maker1",
        /*opera house */
        coordinate:{
          latitude: -33.8655721,
          longitude:  151.2048194,
        }, 
        title: "Kid",
        description: "Where I am?" ,
        image: "http://res.cloudinary.com/yopo/image/upload/r_19/v1509367508/kiddyer/baby-laughing-icon_1.png"
      }],
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {     
    
      const { width, height } = Dimensions.get('window');
      const ratio = width / height; 
      
      this.setState({ 
        loading: false,
        region: {
          latitude: -33.8885795,
          longitude: 151.1851586,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922 * ratio, 
        },
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            region:{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922 * ratio, 
            },
            error: null,
            });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      
    });
  }
 
  render() {
    
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;

    return ( 
      <Container>
        {/* <Header>
          <Title>Map</Title>          
        </Header> */}

         <Content scrollEnabled={false}>
          <View style={{ width, height }}>
            {this.state.loading ? (
              <Loading />
            ) : (
              <MapView
                style={styles.map}
                region={this.state.region}
                showsUserLocation = {true}
                followsUserLocation = {true}
                loadingEnabled = {true}
              >
              {this.state.markers.map((marker, key) => (
                <Marker
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                >
                  <Callout>
                    <Card>
                      <CardItem> 
                        <Left>
                          <Thumbnail source={{uri: "http://res.cloudinary.com/yopo/image/upload/r_19/v1509367508/kiddyer/baby-laughing-icon_1.png"}} />
                          <Body>
                            <Text>{marker.title}</Text> 
                          </Body>
                        </Left>
                      </CardItem>
                      {/* <CardItem cardBody>
                        <Image source={{uri: "http://res.cloudinary.com/yopo/image/upload/r_19/v1509367508/kiddyer/baby-laughing-icon_1.png"}} 
                          style={{height: 40, width: 40, flex: 1}}/>
                      </CardItem> */}
                      <CardItem footer>
                        <Text>{marker.description}</Text>
                      </CardItem>
                    </Card>
                  </Callout>
                </Marker>
              ))}
              </MapView>
            )}
          </View>
        </Content>

        <Footer>
          <FooterTab>
            <Button transparent>
             <Text> Maps</Text> 
            </Button>
          </FooterTab>
        </Footer>
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