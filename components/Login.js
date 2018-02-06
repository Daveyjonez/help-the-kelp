import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Input } from './Input';
import Dashboard from './Dashboard';

import seaFoamGreen from '../assets/styles/colors';

import * as firebase from 'firebase';

var background = require('../assets/images/splash-01.png');

export default class Login extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    componentWillMount(){
        const firebaseConfig = {
            apiKey: 'AIzaSyAiCNhRbXsyyD_r5uyGeNHaHcPH5W3_VAM',
            authDomain: 'help-the-kelp.firebaseapp.com',
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    loginUser = (email, password, navigate) => {
        try{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(user){
                console.log(user);
                navigate('Dashboard', {email, password});
            })
        }
        catch (error){
            alert('No known user for that email and password combination')
            console.log(error.toString());
        }
    }

    static navigationOptions = { header: null }

    render() {
        const{ navigate } = this.props.navigation;

        return (
            <ImageBackground
            source={background}
            style={{width: '100%', height: '100%'}}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior='padding'>
                    <Input
                        placeholder = 'Email'
                        onChangeText = {email => this.setState({email})}
                        value = {this.state.email}
                    />
                    <Input
                        placeholder = 'Password'
                        secureTextEntry
                        onChangeText = {password => this.setState({password})}
                        value = {this.state.password}
                    />
                    <Button style={styles.loginScreenButtons}
                        title = 'Log in'
                        backgroundColor='#3CAFAB'
                        borderRadius={10}
                        onPress = {() => this.loginUser(this.state.email, this.state.password, navigate)}/>

                    <Button style={styles.loginScreenButtons}
                        title = 'Sign up'
                        backgroundColor='#3CAFAB'
                        borderRadius={10}
                        onPress = {() => navigate('SignUp')}/>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 300,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginScreenButtons: {
        paddingTop: 20,
        width: 300,
    }
});
