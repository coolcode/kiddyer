
import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Drawer, Container, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Thumbnail, Text, Content } from 'native-base';
import firebase from 'firebase';

export default class LocationHistory extends Component {
  constructor(props) {
    super(props);

    //this.uid = this.props.uid;
    const user = firebase.auth().currentUser;
    this.histRef = firebase.database().ref('location_hisotry').limitToLast(100);

    this.state = {
      items: [],
      refreshing: false,
    };
  }   

  componentDidMount() {  
      var items = [{uid:'udL1f8DabHVJMg908ibQZvyVc9f2', email:'bruce@test.com'}]; 
      this.setState({items: items}); 
  }
   
  render() {
    return ( 
       <Container> 
          <Content>
                <List
                  dataArray={this.state.items}
                  renderRow={(item) => (
                    <ListItem> 
                      {/* <Left>
                        <Button transparent
                          block
                          onPress={()=> this.viewOnMap(item.key)}
                        >
                            <Thumbnail source={require('../assets/img/child.png') } />
                        </Button>
                        </Left> */}
                      <Body>
                        <Text>{item.email}</Text> 
                      </Body>
                      <Right>
                        <Button transparent
                          block
                          onPress={()=> Actions.locationDetail({uid:item.uid})}
                        > 
                            <Icon name="arrow-forward" />
                        </Button>
                      </Right>
                    </ListItem>
                  )}
                />
          </Content>


       </Container>  
    );
  }
}
