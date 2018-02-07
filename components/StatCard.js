import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import propTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import { seaFoamGreen } from '../assets/styles/colors';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const width = window.width;

export default class StatCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <View style={styles.iconRow}>
                    <View style={styles.iconPair}>
                        <Icon
                            name='weight'
                            type='material-community'
                            iconStyle={styles.pounds}/>
                        <Text style={styles.iconText}> {this.props.pounds}</Text>
                    </View>
                    <View style={styles.iconPair}>
                        <Icon
                            name='food-fork-drink'
                            type='material-community'
                            iconStyle={styles.bottles}/>
                        <Text style={styles.iconText}> {this.props.bottles}</Text>
                    </View>
                    <View style={styles.iconPair}>
                        <Icon
                            name='worker'
                            type='material-community'
                            iconStyle={styles.cleanups}/>
                        <Text style={styles.iconText}> {this.props.cleanups}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

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
        width: width-10,
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
    pounds: {
        color: '#60c5ff',
    },
    bottles: {
        color: '#ffb032',
    },
    cleanups: {
        color: '#d67cf9',
    }
});
