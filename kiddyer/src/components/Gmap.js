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


export default class Gmap extends Component {
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

        /*opera house */
    /**{
        key: "maker1",
        coordinate:{
          latitude: -33.8655721,
          longitude:  151.2048194,
        },
        title: "Kid",
        description: "Where I am?"
      } */
    this.members = [];
    this.membersRef = [];
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
          console.log(`current location!`);
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

      navigator.geolocation.watchPosition((position) => {
        console.log(`watch position!`);
        this.setState({
          region:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * ratio,
          },
          // markers: [{
          //   key: "maker1",
          //   /*opera house */
          //   coordinate:{
          //     latitude: position.coords.latitude,
          //     longitude: position.coords.longitude,
          //   },
          //   title: "Kid",
          //   description: "Where I am?",
          //   image: "../assets/child.png"
          // }],
          error: null,
          });

          //upload my location
          this.uploadLocation(position.coords);

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    //load members
    
    const { id } = this.props;
    console.log(`map: group id: ${id}`);
    this.loadMembers(id);

    });
  }

  loadMembers(id) { 
      const user = firebase.auth().currentUser;      
      this.groupsRef = firebase.database().ref(`member_join/${user.uid}/${id}/members`)
      .once('value', (snapshot) =>{
        var items = [{uid: user.uid, email: user.email}];
        this.membersRef = [];
        snapshot.forEach( (item)=> {
          var key = item.key;
          var val = item.val();
          if(val){
            items.push({
              key,
              uid: val.uid,
              email: val.email
            });
          }
          
        console.log(`member:${val.email}, ${val.uid}`);
        });//snapshot

        this.members = items ;

        items.forEach(item=>{          
          let locationRef = firebase.database().ref(`location/${item.uid}`);
          locationRef.on('value', ss=>{
            let x = ss.val();
            console.log(`location change: ${item.uid}, ${x.lat}, ${x.lng}, ${item.email}`);
            console.log(x);
            var markerKey = `${item.uid}`;
            if(!x){
              return;
            }
            let mk = {
              key: markerKey,
              /*opera house */
              coordinate:{
                latitude: x.lat,
                longitude: x.lng,
              },
              title: item.email,
              description: `(${x.lat}, ${x.lng})`
            };         
            
            //merge markers
            var found = -1;
            for(var i=0;i<this.state.markers.length;i++){
              if(this.state.markers[i].key == markerKey){
                found = i;
                break;
              }
            }

            if(found>=0){
              this.state.markers[found] = mk;
            }else{
              this.state.markers.push(mk);
            }
          });//end locationRef

          this.membersRef.push(locationRef);
        });//end items

      }); 
  }

  uploadLocation(coords){
    console.log(`upload: ${coords.latitude}, ${coords.longitude}`);
    const user = firebase.auth().currentUser;
    const date = new Date();
    const data = {lat:coords.latitude, lng:coords.longitude, created: date};
    let updates = {};
    updates['/location/' + user.uid ] = data;
    //history
    let trackTime = new Date().toISOString()
                      .replace(/T/, ' ')     
                      .replace(/\..+/, '');
    updates[`location_history/${user.uid}/${trackTime}`] = data;
    firebase.database().ref().update(updates); 
  }

  renderMaker(marker, key){
    console.log(`marker: ${marker.key}, ${marker.title}`);

   return (

   <Marker
    key={key}
    coordinate={marker.coordinate}
    title={marker.title}
    description={marker.description}
    image = {require("../assets/img/child.png")} 
    onCalloutPress={() => Actions.chat({uid: marker.key})} 
  >
   <Callout>
      <Card>
        <CardItem> 
               <Text>{marker.title}</Text> 
        </CardItem>
       {/* <CardItem cardBody>
          <Image source={{uri: "http://res.cloudinary.com/yopo/image/upload/r_19/v1509367508/kiddyer/baby-laughing-icon_1.png"}}
            style={{height: 40, width: 40, flex: 1}}/>
        </CardItem>  */}
        <CardItem footer>
          <Text>{marker.description}</Text>
          {/* <Button transparent onPress={() => Actions.chat({uid: marker.key})}>
                <Text>Chat</Text>
              </Button> */}
        </CardItem>
      </Card>
    </Callout>
  </Marker>);
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
                showsUserLocation
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

        {/* <Footer>
          <FooterTab>
            
          <Button transparent onPress={() => Actions.chat()}>
                <Text>Chat</Text>
              </Button>
          </FooterTab>
        </Footer> */}
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
