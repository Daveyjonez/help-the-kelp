import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Avatar, Icon } from 'react-native-elements';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

const Application = StackNavigator({
    Login: { screen: Login},
    Dashboard: { screen: Dashboard,
                 navigationOptions: {
                    headerLeft: (
                        <Icon
                        name='face'
                        type='material-community'
                        />),
                    headerTitle: (
                        <Icon
                            name='format-list-bulleted'
                            type='material-community'
                        />),
                    headerRight: (
                        <Icon
                            name='plus-box-outline'
                            type='material-community'
                        />),

                 }
    },
});

export default class App extends React.Component {
  render() {
    return (
        <Application/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
