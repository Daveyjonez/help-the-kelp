import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import AddEvent from './components/AddEvent';
import EventPage from './components/EventPage';

const Application = StackNavigator({
    Login: { screen: Login},
    SignUp: { screen: SignUp},
    Dashboard: { screen: Dashboard },
    Profile: {screen: Profile},
    AddEvent: {screen: AddEvent},
    EventPage: {screen: EventPage},
});

export default class App extends React.Component {

    componentWillMount() {
        Font.loadAsync({
            'moon-light': require('./assets/fonts/Moon Light.otf'),
            'moon-bold': require('./assets/fonts/Moon Bold.otf'),
        });
    }

    render() {
        return (
            <Application/>
        )
    }
}
