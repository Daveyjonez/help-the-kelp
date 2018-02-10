import React from 'react';
import { StackNavigator } from 'react-navigation';

import * as firebase from 'firebase';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import AddEvent from './components/AddEvent';
import EventPage from './components/EventPage';
import ModalTest from './components/ModalTest';
import Settings from './components/Settings';

const Application = StackNavigator({
    Login: { screen: Login},
    SignUp: { screen: SignUp},
    Dashboard: { screen: Dashboard },
    Profile: {screen: Profile},
    AddEvent: {screen: AddEvent},
    EventPage: {screen: EventPage},
    ModalTest: {screen: ModalTest},
    Settings: {screen: Settings},
});

export default class App extends React.Component {

    componentWillMount(){
        const firebaseConfig = {
            apiKey: 'AIzaSyAiCNhRbXsyyD_r5uyGeNHaHcPH5W3_VAM',
            authDomain: 'help-the-kelp.firebaseapp.com',
            databaseURL: 'https://help-the-kelp.firebaseio.com/',
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    render() {
        return (
            <Application/>
        )
    }
}
