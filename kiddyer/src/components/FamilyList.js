/* @flow */

import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Drawer, Container, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Thumbnail, Text, Content } from 'native-base';
//import CardImage from './CardImage';
import FooterBadge from './FooterBadge';
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

  refreshData(){
    Actions.family();
  }

  listenForDatabases(groupsRef){
    groupsRef.once('value', groups => {
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
  }

  // re-fetch the data to replace the console.log
  _onRefresh() {
    this.setState({ refreshing: true });
    console.log('hi');
    this.setState({ refreshing: false });
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
              <Button transparent onPress={() => this.refreshData()}>
                <Icon name='refresh' />
              </Button>
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
                      <Left>
                        <Thumbnail square size={80} source={{ uri: 'http://res.cloudinary.com/yopo/image/upload/v1509365714/kiddyer/baby-laughing-icon.png' }} />
                      </Left>
                      <Body>
                        <Text>{item.groupName}</Text>
                        <Text note>{item.groupCode}</Text>
                      </Body>
                      <Right>
                        <Text note>3:43 pm</Text>
                      </Right>
                    </ListItem>
                  )}
                />
          </Content>


       </Container>
      <FooterBadge />
     </Drawer>
    );
  }
}
