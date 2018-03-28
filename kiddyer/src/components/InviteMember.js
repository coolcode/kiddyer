/* @flow */

import React, { Component } from 'react';
import {
  Text,
  Image,
} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';

class InviteMember extends Component {

  state = {
    searched: false,
  };

  onButtonPress() {
    this.setState({ searched: true });
  }

  renderCard() {
      if (this.state.searched) {
        return (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('./img3.jpeg')} />
                <Body>
                  <Text>Yahui Liu</Text>
                  <Text note>Daddy</Text>
                </Body>
              </Left>
              <Right>
                <Button transparent>
                  <Text>Add</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        );
      }
      return (
        <Text>Search Your Member</Text>
      );
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
              <Icon name="ios-people" />
            </Item>
            <Button transparent onPress={this.onButtonPress.bind(this)}>
              <Text>Search</Text>
            </Button>
        </Header>

        {this.renderCard()}

      </Container>
    );
  }
}


export default InviteMember;
