import React from 'react';
import { Alert,
        CameraRoll,
        Image,
        Modal,
        ScrollView,
        StyleSheet,
        Text,
        TouchableHighlight,
        View} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import StatCard from './StatCard';
import { Input } from './Input';
import { seaFoamGreen } from '../assets/styles/colors';
var profilePhoto = require('../assets/images/david-01.jpg');

import * as firebase from 'firebase';

export default class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            recycle: 0,
            trash: 0,
            attendance: 0,
            hosted: 0,
            locations: 0,
            miles: 0,

            newRecycle: '',
            newTrash: '',
            newAttendance: '',
            newHosted: '',
            newLocations: '',
            newMiles: '',
        }
    }

    componentWillMount = () => {
        var user = firebase.auth().currentUser;
        var userData = null;
        firebase.database().ref('/users/' + user.uid).once('value')
        .then((snapshot) => {
            userData = snapshot.val();
            this.setState({
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
        var user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).update({
                recycle: Number(this.state.newRecycle) + this.state.recycle,
                trash: Number(this.state.newTrash) + this.state.trash,
                attendance: Number(this.state.newAttendance) + this.state.attendance,
                hosted: Number(this.state.newHosted) + this.state.hosted,
                locations: Number(this.state.newLocations) + this.state.locations,
                miles: Number(this.state.newMiles) + this.state.miles,
            })
        .catch(function(error){
            Alert.alert('Uh oh', 'Something went wrong updating your stats');
            return;
        });
        Alert.alert('Great job!', 'Mother nature thanks you');
    }

    openModal() {this.setState({modalVisible:true});}
    closeModal() {
        this.updateStats();
        this.setState({modalVisible:false});
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
                    <Modal style={styles.modal}
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}>
                        <View style={styles.modal}>
                            <Text style={styles.updateText}>
                                Enter the values you wish to add to your previous totals
                            </Text>
                            <Input
                                placeholder = 'Bags of recyclables'
                                onChangeText = {newRecycle => this.setState({newRecycle})}
                                value = {this.state.newRecycle}/>
                            <Input
                                placeholder = 'Bags of trash'
                                onChangeText = {newTrash => this.setState({newTrash})}
                                value = {this.state.newTrash}/>
                            <Input
                                placeholder = '# of cleanups attended'
                                onChangeText = {newAttendance => this.setState({newAttendance})}
                                value = {this.state.newAttendance}/>
                            <Input
                                placeholder = '# of cleanups hosted'
                                onChangeText = {newHosted => this.setState({newHosted})}
                                value = {this.state.newHosted}/>
                            <Input
                                placeholder = '# of new locations'
                                onChangeText = {newLocations => this.setState({newLocations})}
                                value = {this.state.newLocations}/>
                            <Input
                                placeholder = '# of miles cleaned'
                                onChangeText = {newMiles => this.setState({newMiles})}
                                value = {this.state.newMiles}/>

                            <Button style={styles.buttonStyle}
                                title='Submit'
                                backgroundColor={seaFoamGreen}
                                borderRadius={10}
                                onPress={() => this.updateStats()}/>
                            <Button style={styles.buttonStyle}
                                title='Discard'
                                backgroundColor={seaFoamGreen}
                                borderRadius={10}
                                onPress={() => this.closeModal()}/>
                        </View>
                    </Modal>


                    <View style={styles.fgContainer}>
                        <View style={styles.profileContainer}>
                            <TouchableHighlight
                                activeOpacity={0.75}
                                underlayColor={'transparent'}>
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
                            onPress= {() => this.openModal()}/>
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
    modal: {
        alignItems: 'center',
        paddingTop: 100,
    },
    updateText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#969696',
        paddingLeft: 10,
        paddingRight: 10,
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
