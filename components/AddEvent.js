import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Input } from './Input';

import { seaFoamGreen } from '../assets/styles/colors';

export default class AddEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            eventTitle: '',
            date: '',
            location: '',
        }
    }

    static navigationOptions = {
        headerTintColor: seaFoamGreen
    }

    render(){
        return (
            <View style={styles.container}>
                <Input
                    placeholder = 'Event Title'
                    onChangeText = {eventTitle => this.setState({eventTitle})}
                    value = {this.state.eventTitle}
                />
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
