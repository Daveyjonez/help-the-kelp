import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, TextInput, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Input } from './Input';
import MapView from 'react-native-maps';
import DateTimePicker from 'react-native-modal-datetime-picker';

import * as firebase from 'firebase';

import { seaFoamGreen } from '../assets/styles/colors';
var placeholder = require('../assets/images/placeholder-01.png');


export default class AddEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            eventTitle: '',
            volunteersHave: 1,
            volunteersNeed: null,
            date: '',
            time: '',
            location: '',
            isDatePickerVisible: false,
            isTimePickerVisible: false,
        }
    }

    chooseImage = () => {
        alert('Open camera roll');
    }

    _showDatePicker = () => this.setState({ isDatePickerVisible: true });
    _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

    _showTimePicker = () => this.setState({ isTimePickerVisible: true });
    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        var date = date.toString().substring(0, 15);
        console.log(date);
        this.setState({date})
        this._hideDatePicker();
    };

    _handleTimePicked = (time) => {
        console.log('A time has been picked: ', time);
        var time = time.toString().substring(16, 21);
        console.log(time);
        this.setState({time})
        this._hideTimePicker();
    };

    createEvent = (title, date, location, volunteersNeed) => {

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
                    <TouchableHighlight
                    onPress={() => this.chooseImage()}>
                        <Image
                            source={placeholder}
                            style={{width: '100%', height: 200,}}/>
                    </TouchableHighlight>
                    <Input
                        placeholder = 'Event Title'
                        onChangeText = {eventTitle => this.setState({eventTitle})}
                        value = {this.state.eventTitle}/>

                    <View style={styles.eventDetails}>
                        <Text style={styles.eventText}>{this.state.date}</Text>
                        <Button style={styles.buttonStyle}
                            title='Choose date'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress={this._showDatePicker}/>
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDatePicker}
                            mode={'date'}/>

                        <Text style={styles.eventText}>{this.state.time}</Text>
                        <Button style={styles.buttonStyle}
                            title='Choose time'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress={this._showTimePicker}/>
                        <DateTimePicker
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={this._handleTimePicked}
                            onCancel={this._hideTimePicker}
                            mode={'time'}
                            is24Hour={false}/>
                        <Text style={styles.detailText}>Remember to use correct timezone of location</Text>


                        <Input
                            placeholder = '# of Volunteers Needed'
                            onChangeText = {volunteersNeed => this.setState({volunteersNeed})}
                            value = {this.state.volunteersNeed}/>

                        <Button style={styles.buttonStyle}
                            title = 'Create Event'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            icon={{name: 'check-circle', type: 'material-community'}}
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
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    fgContainer: {
        alignItems: 'stretch',
        flexDirection: 'column',
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
      paddingTop: 10,
      width: 300,
  },
  eventDetails: {
      alignItems: 'center',
      flexDirection: 'column',
  },
  eventText: {
      fontSize: 20,
      color: '#969696',
      marginTop: 20,
  },
  detailText: {
      fontSize: 10,
      fontStyle: 'italic',
      color: '#969696',
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
