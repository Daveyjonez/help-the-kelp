import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class EventCard extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={{uri:'https://yournorthcounty.com/wp-content/uploads/2014/03/Cardiff-by-the-Sea.jpg'}}/>
                    <View style={styles.text}>
                        <View style={styles.headerText}>
                            <Text style={styles.titleText}>
                                Davids Cardiff Cleanup
                            </Text>
                            <Text style={styles.dateText}>
                                2/5/2017
                            </Text>
                        </View>
                        <Text style={styles.locationText}>
                            Location
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderColor: '#cecece',
        borderWidth: 1,
        borderRadius: 5,

        shadowOpacity: 0.75,
        shadowRadius: 3,
        shadowColor: '#cecece',
        shadowOffset: { height: 0, width: 0 },
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        backgroundColor: 'white',
    },
    info: {
        flexDirection: 'row',
    },
    text: {
            flexDirection: 'column',
            paddingLeft: 5,
    },
    headerText: {
            flexDirection: 'row',
            alignSelf: 'stretch',
    },
    titleText: {
        fontSize: 16,
    },
    dateText: {
        fontSize: 10,
        color: '#c1c1c1',
    },
    locationText: {
        fontSize: 12,
    },
    weatherText: {
        fontSize: 12,
    },
});
