import React from 'react';
import { Image,
        KeyboardAvoidingView,
            ScrollView,
            StyleSheet,
            Text,
            TouchableHighlight,
            View } from 'react-native';
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
            title: '',
            host: '',
            date: '',
            time: '',
            location: '',

            volunteersHave: 1,
            volunteersNeed: null,

            haveEquipment: false,

            isDatePickerVisible: false,
            isTimePickerVisible: false,
        }
    }

    createEvent = () => {
        try{
            var newEventKey = firebase.database().ref().child('events').push().key;
            firebase.database().ref('events/' + newEventKey).set({
                title: this.state.title,
                host: this.state.host,
                date: this.state.date,
                time: this.state.time,
                location: this.state.location,
                volunteersHave: this.state.volunteersHave,
                volunteersNeed: this.state.volunteersNeed,
                haveEquipment: this.state.haveEquipment,
            });
        }
        catch(error){
            console.log(error.toString());
        }
        this.props.navigation.navigate('Dashboard');
        return;
    }

    chooseImage = () => {
    }

    _showDatePicker = () => this.setState({ isDatePickerVisible: true });
    _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

    _showTimePicker = () => this.setState({ isTimePickerVisible: true });
    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleDatePicked = (date) => {
        var date = date.toString().substring(0, 15);
        this.setState({date})
        this._hideDatePicker();
    };

    _handleTimePicked = (time) => {
        var time = time.toString().substring(16, 21);
        this.setState({time})
        this._hideTimePicker();
    };

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
                    <View style={styles.eventDetails}>
                        <Input
                            placeholder = 'Event Title'
                            onChangeText = {title => this.setState({title})}
                            value = {this.state.title}/>

                        <Input
                            placeholder = 'Event Host/Sponsor'
                            onChangeText = {host => this.setState({host})}
                            value = {this.state.host}/>

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
                            title='Choose time (24 hr)'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress={this._showTimePicker}
                            is24Hour={true}/>
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
                            onPress = {() => this.createEvent()}/>
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
