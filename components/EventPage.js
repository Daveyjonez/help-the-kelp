import React from 'react';
import { Alert,
        FlatList,
        Image,
        Modal,
        ScrollView,
        StyleSheet,
        Text,
        TextInput,
        View} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Input }from './Input';
import CommentCard from './CommentCard';
import { seaFoamGreen } from '../assets/styles/colors';

import * as firebase from 'firebase';

var defaultImg = require('../assets/images/david-01.jpg');
var placeholder = require('../assets/images/default-01.jpg');

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const screenWidth = window.width;
const screenHeight = window.height;

export default class EventPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            isRSVP: false,
            volunteersHave: 0,
            comment: '',
            commentArr: [],
        }
    }

    componentWillMount() {
        console.log('---- WILL MOUNT EVENT PAGE ----');
        this.fetchInfo();
        this.fetchComments();
    }

    fetchComments = () => {
        console.log('---- FETCHING COMMENTS ----');
        const eventKey = this.props.navigation.state.params.key;
        let tempArr = [];
        console.log('event key: ' + eventKey);
        const ref = firebase.database().ref('/events/' + eventKey + '/comments/');
        ref.on('value', (snapshot) => {
            console.log('---- COMMENT THREAD ----');
            console.log(snapshot);
            tempArr = this.snapshotToArray(snapshot);
        },
        (error) => {
            Alert.alert('Uh oh', 'Something went wrong fetching comments');
        });
        this.setState({
            commentArr: tempArr,
        });
    }

    snapshotToArray = snapshot => {
        let retArr = [];
        console.log('---- CONVERTING SNAPSHOT TO ARRAY ----');
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            retArr.push(item);
        });
        return retArr;
    };

    postComment = () => {
        console.log('---- POSTING COMMENT ----');
        if(!this.state.comment){
            Alert.alert('Hey :(','Please do not post empty comments');
            return;
        }
        console.log('comment: ' + this.state.comment);
        console.log('name: ' + this.state.first +' '+ this.state.last);
        const key = this.props.navigation.state.params.key;
        const ref = firebase.database().ref().child('events/' + key + '/comments/');
        ref.push({
            comment: this.state.comment,
        },
        (error) => {
            if(error){
                Alert.alert('Uh oh', 'Something went wrong while posting your comment');
                return;
            }
            else{
                this.closeModal();
                console.log('---- COMMENT POST SUCCESSFUL ----');
            }
        });
    }

    fetchInfo = () => {
        const eventKey = this.props.navigation.state.params.key;
        const userID = firebase.auth().currentUser.uid;

        let tempRSVP = false;
        let currVolunteers = 0;

        let ref = firebase.database().ref('events/' + eventKey + '/attendees');

        ref.on('value', (snapshot) => {
            snapshot.forEach((childSnap) => {
                currVolunteers = snapshot.numChildren();

                let tempID = JSON.stringify(childSnap.child('attendee'));
                tempID = tempID.slice(1, -1);
                if(tempID === userID){
                    tempRSVP = true;
                }
            });
        },
        (error) => {
            Alert.alert('Uh oh', 'Something went wrong fetching event data');
            return;
        });
        this.setState({
            isRSVP: tempRSVP,
            volunteersHave: currVolunteers,
        });
    }

    handleRSVP = () => {
        const eventKey = this.props.navigation.state.params.key;
        const userKey = firebase.auth().currentUser.uid

        let ref = firebase.database().ref('events/' + eventKey + '/attendees/');
        if(!this.state.isRSVP){
            ref.push({
                attendee: userKey
            })
        }
        else{
            ref.orderByChild('attendee').equalTo(userKey).once('value', snapshot => {
                let updates = {};
                snapshot.forEach(child => {
                    ref.child(child.key).remove();
                });
            });
        }
        this.setState({
            isRSVP: !this.state.isRSVP,
        });
    }

    openModal() {this.setState({modalVisible: true});}
    closeModal = () => {this.setState({modalVisible: false});}

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: seaFoamGreen,
            headerTitle: (<Text style={styles.headerTitle}>Event Page</Text>),
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView style={styles.modal}>
                <Modal style={styles.modal}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}>
                    <View style={styles.modalComment}>
                        <Input
                            placeholder = 'Your comment'
                            onChangeText = {comment => this.setState({comment})}
                            value = {this.state.description}
                            multiline={true}
                            maxLength={140}/>
                        <Button style={styles.buttonStyle}
                            title='Post'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress={() => this.postComment()}/>
                        <Button style={styles.buttonStyle}
                            title='Back'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress={() => this.closeModal()}/>
                    </View>
                </Modal>

                <Image
                    source={placeholder}
                    style={{width: '100%', height: 200,}}/>
                <View style={styles.infoText}>
                    <Text style={styles.titleText}>{this.props.navigation.state.params.title}</Text>
                    <Text style={styles.locationText}>Location: {this.props.navigation.state.params.location}</Text>
                    <Text style={styles.hostText}>Host: {this.props.navigation.state.params.host}</Text>
                    <Text style={styles.descriptionText}>{this.props.navigation.state.params.description}</Text>
                </View>
                <View style={styles.iconRow}>
                    <View style={styles.iconPair}>
                        <Icon
                            name='account-multiple'
                            type='material-community'
                            iconStyle={styles.rsvp}/>
                        <Text style={styles.iconText}>
                            {this.props.navigation.state.params.volunteersHave}/{this.props.navigation.state.params.volunteersNeed}
                        </Text>
                    </View>

                    <View style={styles.iconPair}>
                        <Icon
                            name={this.props.navigation.state.params.equipment?'checkbox-marked':'alert-box'}
                            type='material-community'
                            iconStyle={this.props.navigation.state.params.equipment?styles.equipment:styles.noEquipment}/>
                        <Text style={styles.iconText}>{this.props.navigation.state.params.equipment?'Equipment provided':'Equipment needed!'}</Text>
                    </View>

                    <View style={styles.iconPair}>
                        <Icon
                            name='clock'
                            type='material-community'
                            iconStyle={styles.time}/>
                        <Text style={styles.iconText}>{this.props.navigation.state.params.time}</Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <Button style={styles.buttonStyle}
                        title={this.state.isRSVP?"RSVP'd":'RSVP'}
                        backgroundColor={this.state.isRSVP?'gold':seaFoamGreen}
                        borderRadius={10}
                        onPress={() => this.handleRSVP()}/>
                    <Button style={styles.buttonStyle}
                        title='Write comment'
                        backgroundColor={seaFoamGreen}
                        borderRadius={10}
                        onPress={() => this.openModal()}/>
                </View>
                <FlatList style={styles.list}
                    data={this.state.commentArr}
                    scrollEnabled={false}
                    contentContainerStyle={{alignItems:'center'}}
                    ListEmptyComponent={<Text style={styles.commentText}>No comments yet...</Text>}
                    renderItem={({item}) =>
                    <CommentCard
                        imageSource={item.imageSource?imageSource:defaultImg}
                        name={item.name}
                        comment={item.comment}>
                    </CommentCard>}
                />
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    modal: {
        width: screenWidth,
        height: screenHeight,
    },
    modalComment: {
        alignItems: 'center',
        paddingTop: 200,
    },
    infoText: {
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 25,
        color: seaFoamGreen,
        marginTop: 5,
    },
    locationText: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        fontStyle: 'italic',
        color: '#969696',
        marginLeft: 5,
    },
    hostText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#969696',
        marginLeft: 5,
    },
    descriptionText: {
        fontSize: 14,
        color: '#969696',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
    },
    headerTitle: {
        fontSize: 20,
        color: seaFoamGreen,
        fontFamily: 'Helvetica-Bold',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,
    },
    iconPair: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        color: '#969696',
    },
    commentText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#969696',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 20,
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
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        paddingLeft: 15,
        paddingRight: 15,
    },
    buttonStyle: {
        paddingTop: 20,
        width: 150,
    },
    list: {
        paddingBottom: 10,
    }
});
