import React, { Component } from 'react';
import { Content, Button, Text, Form, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {
  render() {
    return (

       <Content>
         <Form>
           <Item>
             <Input placeholder="Email" />
           </Item>
           <Item>
             <Input placeholder="Password" secureTextEntry />
           </Item>
           <Button
             block
             onPress={() => Actions.main()}
           >
            <Text>Login</Text>
          </Button>
         </Form>
       </Content>

    );
  }
}
