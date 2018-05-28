
import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Drawer, Container, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Thumbnail, Text, Content } from 'native-base';
import firebase from 'firebase';

export default class LocationHistoryDetail extends Component {
  constructor(props) {
    super(props);

    this.uid = this.props.uid;
    const user = firebase.auth().currentUser;
    this.histRef = firebase.database().ref(`location_history/${this.uid}`).limitToLast(100);

    this.state = {
      items: [],
      refreshing: false,
    };
  }    

  componentDidMount() {     
    this.histRef.once('value', groups => {
      var items = [];
      groups.forEach( item=> {
        var date = item.key;
        var val = item.val();
        items.push(val);
        console.log(`d:${val.created}`);
      });
      this.setState({items: items, 
        message: items.length==0?"No Data":''
      });

    });
  }
   
  render() {
    return ( 
      <Container>  
      <Content>
      {this.state.message ? ( 
                <Title style={{ color: 'black' }}>{this.state.message}</Title>
              ):(
            <List 
              dataArray={this.state.items}
              renderRow={(item) => (
                <ListItem 
                avatar 
                onPress={()=> Actions.locationDetailMap({lat:item.lat, lng:item.lng})}> 
                  <Left> 
                      <Thumbnail source={require('../assets/img/kid.png') } /> 
                  </Left>
                    <Body>
                      <Text>{item.created}</Text>
                      <Text note>{item.lat+","+ item.lng}</Text>
                    </Body>  
                </ListItem>
              )}
            />)}
      </Content>
   </Container>  
    );
  }
}
