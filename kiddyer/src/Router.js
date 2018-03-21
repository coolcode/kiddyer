/* @flow */
import React from 'react';
import { Actions, Router, Stack, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import FamilyList from './components/FamilyList';
import InviteMember from './components/InviteMember';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene
            key="login"
            component={Login}
            title="Login"
            rightTitle="Register"
            onRight={() => Actions.register()}
            initial
          />
          <Scene
            key="register"
            component={Register}
            title="Register"
          />
        </Scene>

        <Scene key="main">
          <Scene
            key="family"
            component={FamilyList}
            title="Family Group"
            rightTitle="Invite"
            leftTitle="Logout"
            onRight={() => Actions.invite()}
            onLeft={() => Actions.auth()}
            initial
          />
          <Scene
            key="invite"
            component={InviteMember}
            title="Invite"
          />
        </Scene>
      </Scene>
    </Router>
  );
};


export default RouterComponent;
