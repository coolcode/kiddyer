/* @flow */

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Drawer, Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import CardImage from './CardImage';
import FooterBadge from './FooterBadge';
import Sidebar from './Sidebar';

export default class FamilyList extends Component {

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    this.drawer._root.open()
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
              <Title>Family</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => Actions.invite()}>
                <Icon name='subway' />
              </Button>
            </Right>
          </Header>

          <FlatList
            data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }]}
            renderItem={({ item }) => <CardImage />}
          />
       </Container>
      <FooterBadge />
     </Drawer>
    );
  }
}
