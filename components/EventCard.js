import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import propTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import { seaFoamGreen } from '../assets/styles/colors';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const imageWidth = window.width;

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
            <View style={styles.cardContainer}>
                <View style={styles.info}>
                    <View style={styles.text}>
                        <View style={styles.header}>
                            <Text style={styles.titleText}> {this.props.title}</Text>
                            <Text style={styles.dateText}> {this.props.date}</Text>
                        </View>
                        <Text style={styles.locationText}> {this.props.location}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <View style={styles.iconPair}>
                            <Icon
                                name='account-multiple'
                                type='material-community'
                                iconStyle={styles.rsvp}/>
                            <Text style={styles.iconText}> {this.props.rsvp}</Text>
                        </View>

                        <View style={styles.iconPair}>
                            <Icon
                                name='alert-box'
                                type='material-community'
                                iconStyle={styles.equipment}/>
                            <Text style={styles.iconText}> {this.props.equipment}</Text>
                        </View>

                        <View style={styles.iconPair}>
                            <Icon
                                name='clock'
                                type='material-community'
                                iconStyle={styles.time}/>
                            <Text style={styles.iconText}> {this.props.time}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.imageView}>
                    <Image
                        style={{width: imageWidth-10, height: 100}}
                        source={{uri: this.props.imageSource}}/>
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
    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: 'white',
        shadowOpacity: 0.35,
        shadowColor: '#3CAFAB',
        shadowRadius: 5,
        shadowOffset: { height: 0, width: 0 },
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    info: {
        flexDirection: 'column',
    },
    text: {
        flexDirection: 'column',
        paddingLeft: 3,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    titleText: {
        fontSize: 18,
        color: seaFoamGreen,
        fontFamily: 'Helvetica-Bold',
    },
    dateText: {
        fontSize: 12,
        marginBottom: 5,
        marginRight: 5,
        color: '#969696',
    },
    locationText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#969696',
    },
    imageView: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        width: imageWidth-10,
        height: 100,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 15,
        paddingBottom: 15,
    },
    iconPair: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        color: '#969696',
    },
    rsvp: {
        color: '#60c5ff',
    },
    equipment: {
        color: '#ffb032',
    },
    time: {
        color: '#d67cf9',
    }
});
