import React, { Component } from 'react';
import Logo from './Logo';
import Login from './Login';
import Wallpaper from './Wallpaper';
import SignupSection from './SignupSection';

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Login />
        <SignupSection />
      </Wallpaper>
    );
  }
}
