import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, View, Spinner } from 'native-base'; 
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class JoinGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loading: false,
      groupCode: '',
    };
  }
  
  componentDidMount() {      
    console.log(this.props);
    const { id } = this.props;
    console.log(`load group key: ${id}`);

    this.props.groupCode = 'xxx';
  }

  onGroupCodeChange(text) {
     this.setState({groupCode: text}); 
     console.log(`group code: ${text}`); 
  }

  onButtonPress() {  
    console.log(`group code: ${this.state.groupCode}`); 
    //join 
    
    const user = firebase.auth().currentUser;
    this.groupsRef = firebase.database().ref('groups').limitToLast(1000);    
    groupsRef.once('value', groups => {
      var items = [];
      groups.forEach( (item)=> {
        var key = item.key;
        var val = item.val();
        if(val.groupCode == this.state.groupCode){
          items.push({
            key,
            groupName: val.groupName,
            groupCode: val.groupCode
          });
          return;
        }
      });

      if(len(items) == 0) {
         console.log('Error! Group Code Is Not Found!');
         this.state.error = 'Group Code Is Not Found!';
         return;
      }

      Actions.family();
    });

    
  }
 
  renderError() {
    if (this.state.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner color='blue' />;
    }
    return (
      <Button
        block style={{ marginTop: 10 }}
        onPress={this.onButtonPress.bind(this)}
      >
          <Text> Join </Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Group Code" 
                autoCapitalize="none"
                onChangeText={this.onGroupCodeChange.bind(this)}
                value={this.state.groupCode}
              />
            </Item>  
          </Form>
          {this.renderError()}
          {this.renderButton()}
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
 
export default JoinGroup;
