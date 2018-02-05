import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Avatar, Icon } from 'react-native-elements';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import AddEvent from './components/Profile';

const Application = StackNavigator({
    Login: { screen: Login},
    Dashboard: { screen: Dashboard },
    Profile: {screen: Profile},
    AddEvent: {screen: AddEvent},
});

export default class App extends React.Component {
  render() {
    return (
        <Application/>
    );
  }
}
