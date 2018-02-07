import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { seaFoamGreen } from '../assets/styles/colors';

export default class EventPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    static navigationOptions = {
        headerTintColor: seaFoamGreen
    }

    render(){
        console.log('----------- EVENT PAGE PROPS -------------')
        console.log(this.props)
        console.log('----------- EVENT PAGE STATE -------------')
        console.log(this.state)
        return (
            <View style={styles.container}>
                <Text> This is an event page for:</Text>
                <Button style={styles.buttonStyle}
                    title = 'RSVP'
                    backgroundColor={seaFoamGreen}
                    borderRadius={10}/>
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
    buttonStyle: {
        paddingTop: 20,
        width: 300,
    },
});
