import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import EventCard from './EventCard';

import { seaFoamGreen } from '../assets/styles/colors';

import * as firebase from 'firebase';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: this.props.navigation.state.params.email,
        }
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            console.log('User signed in')
            console.log(user)
          } else {
            // No user is signed in.
            console.log('No user signed in')
          }
        });
    }

    viewProfile = (email, navigation) => {
        console.log(email)
        navigation.navigate('Profile', {email});
    }

    signOutUser = () => {
        try{
            firebase.auth().signOut().then(function() {
                console.log('Signed Out')
                this.props.navigation.navigate('Login')
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
           iconStyle={styles.headerLeft}
           onPress={() => this.viewProfile(this.state.email, navigation)}
           />),
       headerTitle: (
           <Text style={styles.headerTitle}>Dashboard</Text>),
       headerRight: (
           <Icon
               name='plus-box'
               type='material-community'
               iconStyle={styles.headerRight}
               onPress={() => navigation.navigate('AddEvent')}
           />),
       }
   }

    render(){

        const{ navigate } = this.props.navigation;

        console.log('DASHBOARD PROPS')
        console.log(this.props)
        return (
            <ScrollView>
                <Text style={styles.dashboardTitle}>
                    Upcoming Cleanups
                </Text>
                <EventCard
                    imageSource='https://www.californiabeaches.com/wp-content/uploads/2014/09/scripps-pier-beach-la-jolla-bryce16-8-1000x567.jpg'
                    title='Scripps cleanup'
                    date='2/5/2017'
                    location='Scripps Pier, La Jolla'
                    onPress={() => navigate('EventPage', {title: this.state.title})}/>

                <Button
                    title = 'Sign out'
                    onPress = {() => this.signOutUser(navigate)}/>
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
  headerLeft: {
      color: seaFoamGreen,
      paddingLeft: 20,
  },
  headerTitle: {
      fontSize: 20,
      color: seaFoamGreen,
  },
  headerRight: {
      color: seaFoamGreen,
      paddingRight: 20,
  },
  dashboardTitle: {
      fontSize: 25,
      color: seaFoamGreen,
      paddingLeft: 10,
  }
});
