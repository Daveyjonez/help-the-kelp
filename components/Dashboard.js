import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import EventCard from './EventCard';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: this.props.navigation.state.params.email,
        }
    }

    signOutUser = () => {
        try{
            this.props.firebase.auth().signOut().then(function() {
                console.log('Signed Out')
                navigate('Login')
            });
        }
        catch (error){
            alert('Unsuccessful sign out')
            console.log(error.toString());
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
       headerLeft: (
           <Icon
           name='account-circle'
           type='material-community'
           paddingLeft={20}
           onPress={() => navigation.navigate('Profile')}
           />),
       headerTitle: (
           <Icon
               name='format-list-bulleted'
               type='material-community'
           />),
       headerRight: (
           <Icon
               name='plus-box'
               type='material-community'
               paddingRight={20}
               onPress={() => navigation.navigate('AddEvent')}
           />),
       }
   }

    render(){

        return (
            <ScrollView>
                <EventCard/>
                <EventCard/>
                <Button
                    title = 'Sign out'
                    onPress = {() => this.signOutUser(this.state.email, this.state.password)}/>
            </ScrollView>
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
