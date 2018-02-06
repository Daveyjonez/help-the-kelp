import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Input } from './Input';
import Dashboard from './Dashboard';

import { seaFoamGreen }from '../assets/styles/colors';

import * as firebase from 'firebase';

var background = require('../assets/images/signup-01.png');

export default class SignUp extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    signUpUser = () => {

        var databaseApp = null;

        const datafirebaseConfig = {
            apiKey: 'AIzaSyAiCNhRbXsyyD_r5uyGeNHaHcPH5W3_VAM',
            authDomain: 'help-the-kelp.firebaseapp.com',
            databaseURL: 'https://help-the-kelp.firebaseio.com/',
        }
        if (!databaseApp) {
            console.log('INITIALIZING FIREBASE APP...');
            var databaseApp = firebase.initializeApp(datafirebaseConfig, 'database');
        }

        try{
            if(this.state.password.length < 6){
                alert('Please use at least 6 characters for your password')
                return;
            }
            if(this.state.password === this.state.confirmPassword){
                console.log('CREATING USER...');
                databaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                databaseApp.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        console.log('WRITING TO DATABASE...');
                        this.writeUserData(databaseApp, user, this.state.email, this.state.firstName, this.state.lastName);
                    }
                    else {
                        alert('Something went wrong. Please try again.');
                        return;
                    }
                });
            }
            else{
                alert('Passwords do not match');
                return;
            }
            databaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        }
        catch (error){
            console.log(error.toString());
        }
    }

    writeUserData = (databaseApp, user, email, first, last) => {
        console.log('ADDING USER ' + user.uid)
        databaseApp.database().ref('users/' + user.uid).set({
            email: email,
            first: first,
            last: last,
            profile_picture: null,
            pounds: 0,
            cleanups: 0,
        });
        console.log('WRITE COMPLETE')
        //navigate to dashboard
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
                        placeholder = 'First Name'
                        onChangeText = {firstName => this.setState({firstName})}
                        value = {this.state.firstName}
                    />
                    <Input
                        placeholder = 'Last Name'
                        onChangeText = {lastName => this.setState({lastName})}
                        value = {this.state.lastName}
                    />
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
                    <Input
                        placeholder = 'Confirm password'
                        secureTextEntry
                        onChangeText = {confirmPassword => this.setState({confirmPassword})}
                        value = {this.state.confirmPassword}
                    />

                    <Button style={styles.loginScreenButtons}
                        title = 'Create Account'
                        backgroundColor='#3CAFAB'
                        borderRadius={10}
                        onPress = {() => this.signUpUser()}/>
                    <Text style={styles.goBackButton}
                        activeOpacity={0.75}
                        onPress = {() => this.props.navigation.goBack()}>
                        Go back
                    </Text>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginScreenButtons: {
        paddingTop: 20,
        width: 300,
    },
    goBackButton: {
        fontSize: 20,
        color: seaFoamGreen,
        marginTop: 15,
    },
});
