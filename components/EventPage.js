import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import { seaFoamGreen } from '../assets/styles/colors';

export default class EventPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: this.props.navigation.state.params.title,
        }
    }

    static navigationOptions = {
        headerTintColor: seaFoamGreen
    }

    render(){
        return (
            <View style={styles.container}>
                <Text> This is an event page for {this.state.title} </Text>
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
    headerLeft: {
        color: seaFoamGreen,
        paddingLeft: 20,
    },
});
