/* @flow */

import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class FooterBadge extends Component {
  render() {
    return (

        <Footer>
          <FooterTab>
            <Button vertical onPress={() => Actions.gmap()}>
              <Icon name="map" />
              <Text>Map</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}
