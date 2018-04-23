/* @flow */
import React from 'react';
import { Actions, Router, Stack, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import FamilyList from './components/FamilyList';
import InviteMember from './components/InviteMember';
import Gmap from './components/Gmap';
import UserProfile from './components/UserProfile';
import Message from './components/Message';
import LocationHistory from './components/LocationHistory';
import JoinGroup from './components/JoinGroup';

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
            key="userprofile"
            component={UserProfile}
            title="Profile"
          />
          <Scene
            hideNavBar
            key="family"
            component={FamilyList}
            // title="Family Group"
            // rightTitle="Invite"
            // leftTitle="Logout"
            // onRight={() => Actions.invite()}
            // onLeft={() => Actions.auth()}
            initial
          />
          <Scene
            key="invite"
            component={InviteMember}
            title="Invite"
          />
          <Scene
            key="join"
            component={JoinGroup}
            title="Join Group"
          />
          <Scene
            key="viewOnMap"
            component={Gmap}
          />
          <Scene
            key="gmap"
            component={Gmap}
          />
          <Scene
            key="profile"
            component={UserProfile}
          />
          <Scene
            key="message"
            component={Message}
          />
          <Scene
            key="locationHistory"
            component={LocationHistory}
          />
        </Scene>
      </Scene>
    </Router>
  );
};


export default RouterComponent;
