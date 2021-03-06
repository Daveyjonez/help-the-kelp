import React from 'react';
import { Image,
        StyleSheet,
        Text,
        TouchableOpacity,
        View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { seaFoamGreen } from '../assets/styles/colors';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const screenWidth = window.width;

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
                            <Text style={styles.titleText}>{this.props.title}</Text>
                            <Text style={styles.dateText}>{this.props.date}</Text>
                        </View>
                        <Text style={styles.locationText}>{this.props.location}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <View style={styles.iconPair}>
                            <Icon
                                name='account-multiple'
                                type='material-community'
                                iconStyle={styles.rsvp}/>
                            <Text style={styles.iconText}> {this.props.volunteersHave}/{this.props.volunteersNeed}</Text>
                        </View>

                        <View style={styles.iconPair}>
                            <Icon
                                name={this.props.equipment?'checkbox-marked':'alert-box'}
                                type='material-community'
                                iconStyle={this.props.equipment?styles.equipment:styles.noEquipment}/>
                            <Text style={styles.iconText}>{this.props.equipment?'Equipment provided':'Equipment needed!'}</Text>
                        </View>

                        <View style={styles.iconPair}>
                            <Icon
                                name='clock'
                                type='material-community'
                                iconStyle={styles.time}/>
                            <Text style={styles.iconText}>{this.props.time}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.imageView}>
                    <Image
                        style={{width: screenWidth-10, height: 100}}
                        source={this.props.imageSource}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}
}

EventCard.propTypes = {
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
        shadowRadius: 4,
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
        marginLeft: 5,
    },
    titleText: {
        fontSize: 18,
        color: seaFoamGreen,
        fontFamily: 'Helvetica-Bold',
        width: screenWidth - 150,
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
        marginLeft: 5,
    },
    imageView: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        width: screenWidth-10,
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
        color: '#30db99',
    },
    noEquipment: {
        color: '#ffb032',
    },
    time: {
        color: '#d67cf9',
    }
});
