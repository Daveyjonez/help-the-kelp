import React from 'react';
import { Alert,
        KeyboardAvoidingView,
        Modal,
        StyleSheet,
        Text,
        TouchableHighlight,
        View } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from './Input';

import * as firebase from 'firebase';

import { logOutRed, seaFoamGreen } from '../assets/styles/colors';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const screenHeight = window.height;

export default class AddEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            newEmail: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    }

    changeEmail = () => {
        firebase.auth().currentUser.updateEmail(this.state.newEmail)
        .then(function() {
            Alert.alert('Success', 'Your email was updated');
        })
        .catch(function(error){
            Alert.alert('Uh oh', error.toString());
        });
    }

    changePassword = () => {
        if(this.state.newPassword === this.state.confirmNewPassword){
            firebase.auth().currentUser.updatePassword(this.state.newPassword)
            .then(function() {
                Alert.alert('Success', 'Your password was updated');
            })
            .catch(function(error){
                Alert.alert('Uh oh', error.toString());
            });
        }
        else{
            Alert.alert('Uh oh', 'Please enter matching passwords');
            return;
        }
    }

    logOut = () => {
        firebase.auth().signOut().then(function() {})
        .catch(function(error){
            Alert.alert('Uh oh', error.toString());
        });
        firebase.database().goOffline();
        this.props.navigation.navigate('Login');
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: seaFoamGreen,
            headerTitle: (<Text style={styles.headerTitle}>Settings</Text>),
        }
    };

    render(){
        return (
            <View style={styles.container}>
                <Input
                    placeholder = 'New email'
                    onChangeText = {newEmail => this.setState({newEmail})}
                    value = {this.state.newEmail}/>
                <Button style={styles.buttonStyle}
                    title='Change email'
                    backgroundColor={seaFoamGreen}
                    borderRadius={10}
                    onPress={() => this.changeEmail()}/>
                <Input
                    placeholder = 'New password'
                    secureTextEntry
                    onChangeText = {newPassword => this.setState({newPassword})}
                    value = {this.state.newPassword}/>
                <Input
                    placeholder = 'Confirm new password'
                    secureTextEntry
                    onChangeText = {confirmNewPassword => this.setState({confirmNewPassword})}
                    value = {this.state.confirmNewPassword}/>
                <Button style={styles.buttonStyle}
                    title='Change password'
                    backgroundColor={seaFoamGreen}
                    borderRadius={10}
                    onPress={() => this.changePassword()}/>
                <Button style={styles.buttonStyle}
                    title = 'Log out'
                    backgroundColor={logOutRed}
                    borderRadius={10}
                    onPress= {() => this.logOut()}/>
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
      flexDirection: 'column',
      paddingTop: screenHeight - screenHeight*0.85,
  },
  headerTitle: {
      fontSize: 20,
      color: seaFoamGreen,
      fontFamily: 'Helvetica-Bold',
  },
  buttonStyle: {
      paddingTop: 10,
      width: 300,
  },
});
