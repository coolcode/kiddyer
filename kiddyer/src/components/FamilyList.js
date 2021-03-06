/* @flow */

import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Drawer, Container, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Thumbnail, Text, Content } from 'native-base';
//import CardImage from './CardImage';
import Sidebar from './Sidebar';
import firebase from 'firebase';

export default class FamilyList extends Component {
  constructor(props) {
    super(props);

    const user = firebase.auth().currentUser;
    this.groupsRef = firebase.database().ref('member_group/'+ user.uid).limitToLast(100);
    this.state = {
      items: [],
      refreshing: false,
    };
  }

  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  refreshData() {
    Actions.family();
  }

  editItem(groupKey) {
    console.log(`edit key: ${groupKey}`);
    this.setState({
                    key: groupKey,
                    deleteAuth: true
                  });
    Actions.manageMember({
                    id: groupKey,
                    deleteAuth: true,
                  });
  }

  viewOnMap(groupKey) {
    Actions.viewOnMap({ id: groupKey });
  }

  listenForDatabases(groupsRef){
    groupsRef.on('value', groups => {
      var items = [];
      groups.forEach( (item)=> {
        var key = item.key;
        var val = item.val();
        items.push({
          key,
          groupName: val.groupName,
          groupCode: val.groupCode
        });
      });
      this.setState({items: items});
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForDatabases(this.groupsRef);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(`current location!`);
        //upload my location
          this.uploadLocation(position.coords);
        },
        (error) => {},
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );

    navigator.geolocation.watchPosition((position) => {
      console.log(`watch position!`);
      //upload my location
        this.uploadLocation(position.coords);
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
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

  // re-fetch the data to replace the console.log
  _onRefresh() {
    this.setState({ refreshing: true });
    console.log('hi');
    this.setState({ refreshing: false });
  }

  deleteGroup(groupKey) {
    const user = firebase.auth().currentUser;
    const groupTable = firebase.database().ref(`groups/${groupKey}`);
    const memberTable = firebase.database().ref(`member_group/${user.uid}/${groupKey}`);
    const memberJoin = firebase.database().ref(`member_join/${user.uid}/${groupKey}`);
    groupTable.remove();
    memberTable.remove();
    memberJoin.remove();

    Actions.family();
  }

  render() {
    return (
      <Drawer
       ref={(ref) => { this.drawer = ref; }}
       content={<Sidebar navigator={this.navigator} />}
       onClose={() => this.closeDrawer()}
      >

       <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>Member Group</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => Actions.join()}>
                <Icon name='person' />
              </Button>
              {/* <Button transparent onPress={() => this.refreshData()}>
                <Icon name='refresh' />
              </Button> */}
              <Button transparent onPress={() => Actions.invite()}>
                <Icon name='add' />
              </Button>
            </Right>
          </Header>
          <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
                }
          >
                <List
                  dataArray={this.state.items}
                  renderRow={(item) => (
                    <ListItem avatar>
                      {/* <Left>
                        <Thumbnail source={require('../assets/img/child.png') }  onPress={()=> Actions.viewOnMap({ key: item.key})}/>
                      </Left> */}
                      <Left>
                        <Button transparent
                          block
                          onPress={()=> this.viewOnMap(item.key)}
                        >
                            <Thumbnail source={require('../assets/img/child.png') } />
                        </Button>
                        </Left>
                      <Body>
                        <Text>{item.groupName}</Text>
                        <Text note>{item.groupCode}</Text>
                      </Body>
                      <Right>
                        <Button
                          style={{ marginTop: -8 }}
                          block
                          onPress={()=> this.editItem(item.key)}
                          transparent
                        >
                            {/* <Text> Manage </Text> */}
                            <Icon
                              style={{ marginTop: 3 }}
                              name="people"
                            />
                        </Button>
                      </Right>
                      <Right>
                        <Button
                          danger
                          style={{ marginTop: -8 }}
                          block
                          transparent
                          onPress={() => this.deleteGroup(item.key)}
                        >
                          <Icon name="trash" />
                        </Button>
                      </Right>
                    </ListItem>
                  )}
                />
          </Content>


       </Container>
      {/* <FooterBadge /> */}
     </Drawer>
    );
  }
}
