import React from 'react';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
     this.setState({
       messages: [
         {
           _id: 1,
           text: 'Hello developer',
           createdAt: new Date(),
           user: {
             _id: 2,
             name: 'test',
             avatar: '',
           },
         },
       ],
     });
   }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    const Key = firebase.database().ref().child('messages').push().key;
    const updates = {};
    updates['/messages'] = this.state.messages;

    firebase.database().ref().update(updates);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
