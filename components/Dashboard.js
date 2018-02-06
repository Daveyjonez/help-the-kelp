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

    viewProfile = () => {
        console.log()
        this.props.navigation.navigate('Profile');
    }

    viewEvent = (title) => {
        console.log('NAVIGATING TO PAGE FOR...')
        console.log(title)
        this.props.navigation.navigate('EventPage');
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
           onPress={() => this.viewProfile()}
           />),
       headerTitle: (
           <Text style={styles.headerTitle}>Dashboard</Text>),
       headerRight: (
           <Icon
               name='plus-box'
               type='material-community'
               iconStyle={styles.headerRight}
               onPress={() => this.props.navigation.navigate('AddEvent')}
           />),
       }
   }

    render(){
        console.log('----------- DASHBOARD PROPS -------------')
        console.log(this.props)
        console.log('----------- DASHBOARD STATE -------------')
        console.log(this.state)
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.dashboardTitle}>
                        Upcoming Cleanups for {this.state.email}
                    </Text>
                    <EventCard
                        imageSource='https://www.californiabeaches.com/wp-content/uploads/2014/09/scripps-pier-beach-la-jolla-bryce16-8-1000x567.jpg'
                        title='Scripps cleanup'
                        date='2/5/2017'
                        location='Scripps Pier, La Jolla'
                        onPress = {() => this.viewEvent(EventCard.title)}/>
                    <EventCard
                        imageSource='https://www.californiabeaches.com/wp-content/uploads/2014/09/Cardiff-State-Beach-Seaside-BryceApr16-2-1000x537.jpg'
                        title='Davids Cardiff Cleanup'
                        date='12/5/2017'
                        location='Cardiff-by-the-Sea'
                        onPress = {() => this.viewEvent()}/>
                    <Button
                        title = 'Sign out'
                        onPress = {() => this.signOutUser()}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerLeft: {
      color: seaFoamGreen,
      paddingLeft: 20,
  },
  headerTitle: {
      fontSize: 20,
      color: seaFoamGreen,
      fontFamily: 'Helvetica-Bold',
  },
  headerRight: {
      color: seaFoamGreen,
      paddingRight: 20,
  },
  dashboardTitle: {
      fontSize: 25,
      color: seaFoamGreen,
      paddingLeft: 5,
      fontFamily: 'Helvetica-Bold',
      marginTop: 10,
      marginBottom: 10,
  },
});
