import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Input } from './Input';
import Dashboard from './Dashboard';

import * as firebase from 'firebase';

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
        firebase.initializeApp(firebaseConfig)
    }

    loginUser = (email, password, navigate) => {
        try{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(user){
                console.log(user);
                navigate('Dashboard');
            })
        }
        catch (error){
            alert('No known user for that email and password combination')
            console.log(error.toString());
        }
    }

    signUpUser = (email, password) => {
        try{
            if(this.state.password.length < 6){
                alert('Please use at least 6 characters for your password')
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password);
        }
        catch (error){
            console.log(error.toString());
        }
    }

  render() {
    const{ navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <Input
                placeholder = 'Please enter your email...'
                label = 'Email'
                onChangeText = {email => this.setState({email})}
                value = {this.state.email}
            />
            <Input
                placeholder = 'Please enter your password...'
                label = 'Password'
                secureTextEntry
                onChangeText = {password => this.setState({password})}
                value = {this.state.password}
            />
            <Button
            title = 'Log in'
            onPress = {() => this.loginUser(this.state.email, this.state.password, navigate)}/>

            <Button
            title = 'Sign up'
            onPress = {() => this.signUpUser(this.state.email, this.state.password)}/>

        </View>
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
