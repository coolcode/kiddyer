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
import timer from 'react-native-timer';


export default class Gmap extends Component {
  constructor(props){
    super(props);
    this.zoom = 0.0520;
    this.state = {
      loading: true,
      region: {
        latitude: -33.8885795,
        longitude: 151.1851586,
      },
      markers: [],
    };
 
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
              latitudeDelta: this.zoom,
              longitudeDelta: this.zoom * ratio,
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
            latitudeDelta: this.zoom,
            longitudeDelta: this.zoom * ratio,
          }, 
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


    });//run after interval
  }

  onRandomMove(){    
    //random move
    timer.setInterval('timer1',() => {
      console.log('re loaction!');   
      this.members.forEach(m=>{
          console.log(m);
      });
      
      var r = Math.random();
      console.log(`r: ${r}`);
      console.log(this.state.markers);
      var index = 1; 
      if(r>0.4){
        index = this.members.length-1;
      }else{
        index = 1;
      }
      var uid = this.members[index].uid;
      if(this.state.markers.length<=index){
        return;
      }
      //
      console.log(`uploadUserLocation! ${index}`);     
      var currentLocation = this.state.markers[index].coordinate;
      currentLocation = this.randomMove(currentLocation);
      console.log(currentLocation); 
      this.uploadUserLocation( uid, currentLocation);
    }, 2000);
  }

  randomMove(oldloc) {
    var loc = {latitude: oldloc.latitude, longitude: oldloc.longitude};
    var r = Math.random();
    if (r < 0.3) {
        loc.latitude += 0.0001;
        loc.longitude -= 0.0001;
    } else if (r < 0.5) {
        loc.latitude -= 0.0003;
        loc.longitude += 0.0001;
    } else if (r < 0.7) {
        loc.latitude -= 0.00005;
        loc.longitude -= 0.0002;
    } else {
        loc.latitude += 0.00005;
        loc.longitude += 0.0003;
    }
    return loc;
  }

  loadMembers(id) { 
      const user = firebase.auth().currentUser;      
      this.groupsRef = firebase.database().ref(`member_group/${user.uid}/${id}/members`)
      .once('value', (snapshot) =>{
        var items = [{uid: user.uid, email: user.email}];
        this.membersRef = [];
        snapshot.forEach( item=> {
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
        //this.onRandomMove();

        items.forEach(item=>{          
          let locationRef = firebase.database().ref(`location/${item.uid}`);
          locationRef.on('value', ss=>{
            let x = ss.val();
            console.log(x);
            var markerKey = `${item.uid}`;
            if(!x){
              return;
            }
            console.log(`location change: ${item.uid}, ${x.lat}, ${x.lng}, ${item.email}`);
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

            var newMarkers = this.state.markers;
            if(found>=0){
              newMarkers[found] = mk;
            }else{
              newMarkers.push(mk);
            }

            this.setState({markers: newMarkers});
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

  uploadUserLocation(uid, coords){
    console.log(`upload: ${coords.latitude}, ${coords.longitude}`); 
    const date = new Date();
    const data = {lat:coords.latitude, lng:coords.longitude, created: date};
    let updates = {};
    updates['/location/' + uid ] = data;
    //history
    let trackTime = new Date().toISOString()
                      .replace(/T/, ' ')     
                      .replace(/\..+/, '');
    updates[`location_history/${uid}/${trackTime}`] = data;
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
    image = {marker.key== firebase.auth().currentUser.uid ? require("../assets/img/gps.png"): require("../assets/img/kid.png")} 
    onCalloutPress={() => Actions.chat({uid: marker.key})} 
  >
   <Callout>
      <Card>
        <CardItem>  
               <Text>{marker.title}</Text> 
        </CardItem>
       {/* <CardItem cardBody>
          <Image source={require("../assets/img/child.png")}
            style={{height: 128, width: 128, flex: 1}}/>
        </CardItem> */}
        {/* <CardItem footer>
          <Text>{marker.description}</Text> 
        </CardItem> */}
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
