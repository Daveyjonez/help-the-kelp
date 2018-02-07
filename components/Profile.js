import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import StatCard from './StatCard';


import { seaFoamGreen } from '../assets/styles/colors';
var profilePhoto = require('../assets/images/david-01.jpg');

import * as firebase from 'firebase';

export default class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    logOut = () => {
        firebase.auth().signOut().then(function() {
            }, function(error) {
                console.log(error.toString);
        });
        this.props.navigation.navigate('Login');
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: seaFoamGreen,
            headerTitle: (<Text style={styles.headerTitle}>Your Profile</Text>),
        }
    }

    render(){
        return (
            <View style={styles.bgContainer}>
                <ScrollView>
                    <View style={styles.fgContainer}>
                        <View style={styles.profileContainer}>
                            <Image style={styles.profileImg}
                                source={profilePhoto}/>
                        </View>

                        <View style={styles.stats}>
                            <StatCard
                                title='Stats'
                                pounds={138}
                                bottles={42}
                                cleanups={5}/>
                        </View>
                        <Button style={styles.buttonStyle}
                            title = 'Log out'
                            backgroundColor='#f44242'
                            borderRadius={10}
                            onPress= {() => this.logOut()}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'column',
    },
    fgContainer: {
      marginTop: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        color: seaFoamGreen,
        fontFamily: 'Helvetica-Bold',
    },
    stats: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    profileContainer: {
        alignItems: 'center',
        height: 310,
        width: 310,
        borderRadius: 155,
        paddingTop: 5,
        shadowOpacity: 0.35,
        shadowColor: '#3CAFAB',
        shadowRadius: 5,
        shadowOffset: { height: 0, width: 0 },
    },
    profileImg: {
        height: 300,
        borderRadius: 150,
        width: 300,
        paddingTop: 20,
    },
    buttonStyle: {
        paddingTop: 20,
        width: 100,
    },
    dataNum: {
        fontSize: 50,
        color: seaFoamGreen,
        fontFamily: 'Helvetica-Bold',
        paddingTop: 10,
    },
    dataText: {
        fontSize: 16,
        color: '#969696',
        fontFamily: 'Helvetica',
        paddingTop: 5,
    },
});
