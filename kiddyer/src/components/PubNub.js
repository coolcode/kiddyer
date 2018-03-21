
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PubNub from 'pubnub'

export default class ReactPubNub extends Component {
  render() {
    return (
        <View>
            <Text>{this.state}</Text>
        </View>
    );
  }
}

const pubnub = new PubNub({
    subscribeKey: "pub-c-767ad932-3c82-48bf-9321-af8c88996481",
    publishKey: "sub-c-ec401df2-b088-11e7-8d62-62090b44bf58",
    ssl: true
})

pubnub.addListener({
    message: function(message) {
        console.log(message);
        // handle message
    }
})

pubnub.subscribe({ 
    channels: ['map-channel'] 
});

