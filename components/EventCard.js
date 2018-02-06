import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import propTypes from 'prop-types';

import { seaFoamGreen } from '../assets/styles/colors';

export default class EventCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
    return (
        <TouchableOpacity
        activeOpacity={0.75}
        onPress={this.props.onPress}>
            <View style={styles.container}>
                <View style={styles.info}>
                <Image
                    style={{width: 100, height: 100, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                    source={{uri: this.props.imageSource}}/>
                    <View style={styles.text}>
                        <View style={styles.headerText}>
                            <Text style={styles.titleText}> {this.props.title} </Text>
                            <Text style={styles.dateText}> {this.props.date} </Text>
                        </View>
                        <Text style={styles.locationText}> {this.props.location} </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
}

EventCard.propTypes = {
    onPress: propTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'gray',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowOffset: { height: 0, width: 0 },
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: 'white',
    },
    info: {
        flexDirection: 'row',
    },
    text: {
        flexDirection: 'column',
        paddingLeft: 3,
    },
    headerText: {
        flexDirection: 'row',
        alignContent: 'flex-end',
    },
    titleText: {
        fontSize: 16,
        color: seaFoamGreen,
        fontFamily: 'Helvetica-Bold',
    },
    dateText: {
        fontSize: 10,
        color: '#c1c1c1',
    },
    locationText: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    weatherText: {
        fontSize: 12,
    },
});
