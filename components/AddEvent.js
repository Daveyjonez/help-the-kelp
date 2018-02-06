import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Input } from './Input';
import { MapView, Marker } from 'react-native-maps';

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
        headerTintColor: seaFoamGreen,
    };

    render(){
        return (
                <View style={styles.container}>
                    <Input
                        placeholder = 'Event Title'
                        onChangeText = {eventTitle => this.setState({eventTitle})}
                        value = {this.state.eventTitle}
                    />
                    <MapView style={styles.map}
                        initialRegion={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
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
  },
  map: {
      left: 0,
      right: 0,
      top: 75,
      bottom: 350,
      position: 'absolute',
  }
});
