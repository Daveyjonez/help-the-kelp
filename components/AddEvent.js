import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TextInput, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Input } from './Input';
import MapView from 'react-native-maps';
import DateTimePicker from 'react-native-modal-datetime-picker';

import * as firebase from 'firebase';

import { seaFoamGreen } from '../assets/styles/colors';

export default class AddEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            eventTitle: '',
            volunteersNeed: '',
            date: '',
            location: '',
            isDateTimePickerVisible: false,
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    createEvent = (title, date, location, volunteersNeed) => {
        try{
            firebase.database().ref('events/' + user.uid).set({
                email: email,
                first: first,
                last: last,
                profilePicture: null,
                pounds: 0,
                cleanups: 0,
            });
        }
        catch(error){
            console.log(error.toString());
        }
        return;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: seaFoamGreen,
            headerTitle: (<Text style={styles.headerTitle}>New Event</Text>),
        }
    };

    render(){
        return (
            <View style={styles.bgContainer}>
                <ScrollView>
                    <View style={styles.fgContainer}>
                    <Input
                        placeholder = 'Event Title'
                        onChangeText = {eventTitle => this.setState({eventTitle})}
                        value = {this.state.eventTitle}/>

                    <View style={styles.eventDetails}>
                        <Button style={styles.buttonStyle}
                            title = 'Choose Date'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress = {this._showDateTimePicker}/>

                        <Button style={styles.buttonStyle}
                            title = 'Choose Time'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress = {this._showDateTimePicker}/>

                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}/>

                        <Input
                            placeholder = '# of Volunteers Needed'
                            onChangeText = {volunteers => this.setState({volunteersNeed})}
                            value = {this.state.volunteersNeed}/>

                        <Button style={styles.buttonStyle}
                            title = 'Create Event!'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress = {this.createEvent()}/>
                    </View>
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
        alignItems: 'center',
        flexDirection: 'column',
    },
    fgContainer: {
        marginTop: 10,
    },
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'column',
  },
  headerTitle: {
      fontSize: 20,
      color: seaFoamGreen,
      fontFamily: 'Helvetica-Bold',
  },
  buttonStyle: {
      paddingTop: 20,
      width: 300,
  },
  eventDetails: {
  },
  completeButton: {
      flexDirection: 'column',
      alignItems: 'center',
  },
  createIcon: {
      color: seaFoamGreen,
  },
  createText: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#969696',
  }
});
