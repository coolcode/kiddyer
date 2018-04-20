import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, View, Spinner, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import { emailChanged, passwordChanged, createUser } from '../actions';

class UserProfile extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.updateUser({ email, password });
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
          <Text> Update </Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
            <Text>{this.props.user.uid}</Text>
            </Item>
            <Item> 
              <Input
                placeholder="Email"
                onChangeText={this.onEmailChange.bind(this)}
                autoCapitalize="none"
                value={this.props.email}
              />
            </Item>
            <Item last>
              <Input
                secureTextEntry
                placeholder="Password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
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

// mapStateToProps 完成了 reducer state 到 component props，为了链接对应的action，使用connect 链接reducer state 和 actions
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    message: state.auth.message
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, createUser })(UserProfile);
 