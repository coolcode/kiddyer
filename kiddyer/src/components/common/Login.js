import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput
} from 'react-native';

import { Button, Spinner, Toast } from 'native-base';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import usernameImg from '../../assets/img/username.png';
import passwordImg from '../../assets/img/password.png';
import eyeImg from '../../assets/img/eye_black.png';


class Login extends Component {

  state = {
      showPass: true,
      press: false,
    };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
      const { email, password } = this.props;
      this.props.loginUser({ email, password });
  }

  showPass() {
      this.state.press === false
        ? this.setState({ showPass: false, press: true })
        : this.setState({ showPass: true, press: false });
    }

  renderButton() {
    if (this.props.loading) {
      return (
        <View style={{ flex: 1 }}>
          <Spinner color='green' />
        </View>

      );
    }
    return (
      <Button
        block rounded success style={{ marginLeft: 15, marginRight: 15 }}
        onPress={this.onButtonPress.bind(this)}
      >
          <Text> Login </Text>
      </Button>
    );
  }

  renderError() {
      if (this.props.error) {
        return (
          // <View style={{ backgroundColor: 'white' }}>
          //   <Text style={styles.errorTextStyle}>
          //     {this.props.error}
          //   </Text>
          // </View>
          Toast.show({
                text: 'Authentication Failed',
                buttonText: 'OK',
                type: 'success',
                duration: 3000
              })
        );
      }
    }

  render() {
    return (

        <KeyboardAvoidingView  style={styles.container}>

          <View style={styles.inputWrapper}>
            <Image source={usernameImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              secureTextEntry={false}
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image source={passwordImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={this.state.showPass}
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass.bind(this)}
          >
            <Image source={eyeImg} style={styles.iconEye} />
          </TouchableOpacity>

          {this.renderButton()}
          {this.renderError()}
        </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 50,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },

  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});

// mapStateToProps 完成了 reducer state 到 component props，为了链接对应的action，使用connect 链接reducer state 和 actions
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);
