import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import propTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import Stat from './Stat';
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
                        <Stat
                            numText='36'
                            titleText='Bags of recyclables'
                            iconName='recycle'
                            iconType='material-community'
                            iconColor='#30db99'/>
                        <Stat
                            numText='42'
                            titleText='Bags of trash'
                            iconName='delete'
                            iconType='material-community'
                            iconColor='gray'/>
                        <Stat
                            numText='8'
                            titleText='Cleanups attended'
                            iconName='worker'
                            iconType='material-community'
                            iconColor='#d775ef'/>
                    </View>
                    <View style={styles.iconRow}>
                        <Stat
                            numText='2'
                            titleText='Cleanups hosted'
                            iconName='clipboard-text'
                            iconType='material-community'
                            iconColor='#ffb032'/>
                        <Stat
                            numText='3'
                            titleText='Different locations'
                            iconName='map-marker'
                            iconType='material-community'
                            iconColor='#e23f52'/>
                        <Stat
                            numText='21'
                            titleText='Miles cleaned'
                            iconName='walk'
                            iconType='material-community'
                            iconColor='#50a7e5'/>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: 'white',

        shadowOpacity: 0.35,
        shadowColor: '#3CAFAB',
        shadowRadius: 5,
        shadowOffset: { height: 0, width: 0 },

        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        width: width-10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    titleText: {
        fontSize: 30,
        color: seaFoamGreen,
        fontFamily: 'Helvetica-Bold',
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 5,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
    },
});
