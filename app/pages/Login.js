import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Form, Item, Input } from 'native-base';

export default class Login extends Component {
  render() {
    return (
      <Container>
       <Content>
         <Form>
           <Item>
             <Input placeholder="Username" />
           </Item>
           <Item>
             <Input placeholder="Password" secureTextEntry />
           </Item>
           <Button block>
            <Text>Login</Text>
          </Button>
         </Form>
       </Content>
     </Container>
    );
  }
}
