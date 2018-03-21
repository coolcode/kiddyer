/* @flow */

import React, { Component } from 'react';
import {
  Text,
  Image,

} from 'react-native';
import { Card, CardItem, Thumbnail, Button, Left, Body, Right } from 'native-base';


export default class CardImage extends Component {
  render() {
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
           </CardItem>
           <CardItem cardBody>
             <Image source={require('./img3.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
           </CardItem>
           <CardItem>
             <Left>
               <Button transparent>
                 <Text>Position</Text>
               </Button>
             </Left>

             <Right>
               <Button transparent>
                 <Text>Chat</Text>
               </Button>
             </Right>
           </CardItem>
         </Card>
    );
  }
}
