import React, { Component } from 'react';
import { RefreshControl, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Title, List, ListItem, Thumbnail, Text, Content, Input, Spinner, Button } from 'native-base';
import firebase from 'firebase';
//import CardImage from './CardImage';


export default class FamilyList extends Component {
  constructor(props) {
    super(props);

    const user = firebase.auth().currentUser;
    this.messagesRef = firebase.database().ref('group_message/'+ user.uid).limitToLast(100);

    this.state = {
      items: [],
      refreshing: false,
    };
  }

  listenForDatabases(messagesRef) {
    messagesRef.on('value', groups => {
      var items = [];
      groups.forEach((item) => {
        var key = item.key;
        var val = item.val();
        items.push({
          key,
          user: val.groupUser,
          message: val.message
        });
      });
      this.setState({ items });
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForDatabases(this.messagesRef);
  }

  // re-fetch the data to replace the console.log
  _onRefresh() {
    this.setState({ refreshing: true });
    console.log('hi');
    this.setState({ refreshing: false });
  }

  onTextChanged() {

  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner color='blue' />;
    }
    return (
      <Button
        block style={{ marginTop: 10 }}
        onPress={this.onButtonPress.bind(this)}
      >
          <Text> Login </Text>
      </Button>
    );
  }

  render() {
    //var firstImage = require('../images/01.jpg');
    return (
       <Container>
          <Header>
            <Body>
              <Title>Chat Room</Title>
            </Body>
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
                    <ListItem>
                      <Left>
                        {/* <Thumbnail square size={80} source={{ uri: 'http://res.cloudinary.com/yopo/image/upload/v1509365714/kiddyer/baby-laughing-icon.png' }} /> */}
                        {item.groupUser}
                      </Left>
                      <Body>
                        <Text>{item.message}</Text>
                      </Body>
                      <Right>
                        <Text note>3:43 pm</Text>
                      </Right>
                    </ListItem>
                  )}
                />

                <Input
                  placeholder="Password"
                  onChangeText={this.onTextChanged.bind(this)}
                  value={this.props.text}
                />


          </Content>
       </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red',
  }
};
