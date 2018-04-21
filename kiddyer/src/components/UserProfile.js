import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, View, Spinner, Grid, Row } from 'native-base';
import { emailChanged, passwordChanged, updateUser, currentPasswordChanged } from '../actions';

class UserProfile extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onCurrentPasswordChange(text) {
        this.props.currentPasswordChanged(text);
    }

    onButtonPress() {
        const { currentPassword, password } = this.props;
        this.props.updateUser({ currentPassword, password });
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
                <Item style={{ height: 50 }}>
                  <Text>Your Email Account: {this.props.email}</Text>
                </Item>
                <Item>
                  <Input
                    secureTextEntry
                    placeholder="Old Password"
                    onChangeText={this.onCurrentPasswordChange.bind(this)}
                    autoCapitalize="none"
                    value={this.props.currentPassword}
                  />
                </Item>
                <Item last>
                  <Input
                    secureTextEntry
                    placeholder="New Password"
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
    user: state.auth.user,
    email: state.auth.email,
    password: state.auth.password,
    currentPassword: state.auth.currentPassword,
    error: state.auth.error,
    loading: state.auth.loading,
    message: state.auth.message
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, updateUser, currentPasswordChanged })(UserProfile);
