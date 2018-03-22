
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
    console.log("PubNub Demo");
    return (
        <View>
            <Text>PubNub</Text>
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


function randomMove(loc) {
    let r = Math.random();
    if (r < 0.3) {
        loc.lat += 0.0001;
        loc.lng -= 0.0001;
    } else if (r < 0.5) {
        loc.lat -= 0.0003;
        loc.lng += 0.0001;
    } else if (r < 0.7) {
        loc.lat -= 0.00005;
        loc.lng -= 0.0002;
    } else {
        loc.lat += 0.00005;
        loc.lng += 0.0003;
    }
    return loc;
}

let currentLocation = {lat:-33.8655721, lng: 151.2048194};  

setTimeout(function(){      
    currentLocation = randomMove(currentLocation);
    pubnub.publish({channel: 'map-channel', message: currentLocation});
    console.log("realtime location: " + currentLocation.lat + ","+ currentLocation.lng);
}, 2000);
