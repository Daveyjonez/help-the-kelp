import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import EventCard from './EventCard';

import { seaFoamGreen } from '../assets/styles/colors';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: this.props.navigation.state.params.email,
        }
    }

    viewProfile = () => {
        console.log()
        this.props.navigation.navigate('Profile', );
    }

    viewEvent = () => {
        console.log('---------- EVENT PAGE STATE -----------')
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
                    onPress={() => navigation.navigate('Profile')}/>),
            headerTitle: (<Text style={styles.headerTitle}>Dashboard</Text>),
            headerRight: (
                <Icon
                    name='plus-box'
                    type='material-community'
                    iconStyle={styles.headerRight}
                    onPress={() => navigation.navigate('AddEvent')}/>),
       }
   }

    render(){
        console.log('----------- DASHBOARD PROPS -------------')
        console.log(this.props)
        console.log('----------- DASHBOARD STATE -------------')
        console.log(this.state)
        return (
            <View style={styles.bgContainer}>
                <ScrollView>
                    <View style={styles.fgContainer}>
                        <EventCard
                            imageSource='https://www.californiabeaches.com/wp-content/uploads/2014/09/scripps-pier-beach-la-jolla-bryce16-8-1000x567.jpg'
                            title='Scripps cleanup'
                            date='2/5/2017'
                            location='Scripps Pier, La Jolla'
                            rsvp={22}
                            equipment='Equipment needed'
                            time='8:30 AM'
                            onPress = {() => this.viewEvent()}/>
                        <EventCard
                            imageSource='https://www.californiabeaches.com/wp-content/uploads/2014/09/Cardiff-State-Beach-Seaside-BryceApr16-2-1000x537.jpg'
                            title='Davids Cardiff Cleanup'
                            date='12/15/2017'
                            location='Cardiff-by-the-Sea'
                            rsvp={135}
                            equipment='Equipment needed'
                            time='12:35 PM'
                            onPress = {() => this.viewEvent()}/>
                        <EventCard
                            imageSource='https://www.californiabeaches.com/wp-content/uploads/2014/09/BigS-Overlooking-Blacks-Beach-San-Diego-CA-Large-e1512026583176-1000x627.jpg'
                            title='Blacks Beach Cleanup'
                            date='8/25/2018'
                            location='Black Beach, San Diego'
                            rsvp={53}
                            equipment='Equipment needed'
                            time='10:00 AM'
                            onPress = {() => this.viewEvent()}/>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fgContainer: {
    marginTop: 10,
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
});
