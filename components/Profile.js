import React from 'react';
import { Alert,
        Image,
        CameraRoll,
        Modal,
        ScrollView,
        StyleSheet,
        Text,
        TouchableHighlight,
        View} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import StatCard from './StatCard';

import { seaFoamGreen } from '../assets/styles/colors';
var profilePhoto = require('../assets/images/david-01.jpg');

import * as firebase from 'firebase';

export default class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            recycle: 0,
            trash: 0,
            attendance: 0,
            hosted: 0,
            locations: 0,
            miles: 0,
        }
    }

    componentWillMount = () => {
        var user = firebase.auth().currentUser;
        firebase.database().ref('/users/' + user.uid).once('value')
        .then((snapshot) => {
            var userData = snapshot.val;
            this.setState({
                name: userData.first,
                recycle: userData.recycle,
                trash: userData.trash,
                attendance: userData.attendance,
                hosted: userData.hosted,
                locations: userData.locations,
                miles: userData.miles,
            });
        })
        .catch(function(error) {
            Alert.alert('Uh oh', 'Something went wrong while loading your profile');
            console.log(error.toString());
            return;
        });
    }

    updateStats = () => {

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
                            <TouchableHighlight
                                activeOpacity={0.75}
                                underlayColor={'transparent'}
                                onPress={() => this.openModal()}>

                                <Image style={styles.profileImg}
                                source={profilePhoto}/>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.stats}>
                            <StatCard
                                title='Your stats'
                                recycle={this.state.recycle}
                                trash={this.state.trash}
                                attendance={this.state.attendance}
                                hosted={this.state.hosted}
                                locations={this.state.locations}
                                miles={this.state.miles}/>
                        </View>
                        <Button style={styles.buttonStyle}
                            title = 'Update stats'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            icon={{name: 'emoticon-happy', type: 'material-community'}}
                            onPress= {() => this.updateStats()}/>
                        <Button style={styles.buttonStyle}
                            title = 'Settings'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress= {() => this.props.navigation.navigate('Settings')}/>
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
      alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        color: seaFoamGreen,
        fontFamily: 'Helvetica-Bold',
    },
    profileContainer: {
        alignItems: 'center',
        height: 310,
        width: 310,
        borderRadius: 155,
        paddingTop: 5,
        marginBottom: 10,
    },
    profileImg: {
        height: 300,
        borderRadius: 150,
        width: 300,
        paddingTop: 20,
    },
    stats: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    buttonStyle: {
        paddingTop: 20,
        width: 300,
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
