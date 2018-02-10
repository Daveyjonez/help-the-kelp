import React from 'react';
import { FlatList,
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
            comment: '',
            commentArr: [],
            volunteersHave: 0,
        }
    }

    componentWillMount() {
        try{
            var key = this.props.navigation.state.params.key;
            var ref = firebase.database().ref('/events/' + key + '/volunteersHave');
            ref.on('value', (snapshot) => {
                this.setState({
                    volunteersHave: snapshot.val,
                });
            });
        }
        catch(error){
            Alert.alert('Uh oh', 'Something went wrong');
            return;
        }
        this.fetchComments();
    }

    fetchComments = () => {
        var tempArr = [];
        var key = this.props.navigation.state.params.key;
        var ref = firebase.database().ref('/events/' + key + '/comments/');
        ref.once('value').then((snapshot) => {
            this.snapshotToArray(snapshot);
        })
        .catch(function(error){
            alert(console.log(error.toString()));
        });
    }

    snapshotToArray = snapshot => {
        var tempArr = [];
        snapshot.forEach(childSnapshot => {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            tempArr.push(item);
        });
        this.setState({
            commentArr: tempArr
        });
    };

    postComment = (key) => {
        try{
            if(this.state.comment){
                var tempArr = [];
                firebase.database().ref().child('events/' + key + '/comments/').push({
                    comment: this.state.comment,
                });
                this.closeModal();
            }
            else{
                alert('Please do not post empty comments');
                return;
            }
        }
        catch(error){
            alert('Something went wrong while posting your comment');
            return;
        }
    }

    handleRSVP = (key) => {
        if(this.state.isRSVP){
            this.decRSVP(this.props.navigation.state.params.key);
        }
        else{
            this.incRSVP(key);
        }
    }

    incRSVP = (key) => {
        firebase.database().ref('events/' + key + '/volunteersHave').transaction(
            (currentVolunteers) => {
                currentVolunteers++;
                return(currentVolunteers)
            });

        var user = firebase.auth().currentUser;
        firebase.database().ref().child('events/' + key + '/attendees/').push({
            attendee: user.uid,
        });

        this.setState({
            isRSVP: true,
        });
    }

    decRSVP = (key) => {
        var user = firebase.auth().currentUser;
        var ref = firebase.database();

        //TODO
        //remove user id from event attendees

        ref.ref('events/' + key + '/volunteersHave').transaction(
            (currentVolunteers) => {
                if(currentVolunteers >= 0){currentVolunteers--;}
                return(currentVolunteers)
            });

        this.setState({
            isRSVP: false,
        });
    }

    openModal() {this.setState({modalVisible:true});}
    closeModal = () => {
        this.fetchComments();
        this.setState({modalVisible:false});
    }


    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: seaFoamGreen,
            headerTitle: (<Text style={styles.headerTitle}>Event Page</Text>),
        }
    }

    render(){
        var isRSVP = this.state.isRSVP
        var rsvpButton = false;
        if(isRSVP){
            rsvpButton =
            <Button style={styles.buttonStyle}
                title = "RSVP'd"
                backgroundColor='gold'
                icon={{name: 'star-circle', type: 'material-community'}}
                borderRadius={10}
                onPress ={() => this.handleRSVP(this.props.navigation.state.params.key)}/>
        }
        else{
            rsvpButton =
            <Button style={styles.buttonStyle}
               title = 'RSVP'
               backgroundColor={seaFoamGreen}
               borderRadius={10}
               onPress ={() => this.handleRSVP(this.props.navigation.state.params.key)}/>
        }
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
                            title='Submit'
                            backgroundColor={seaFoamGreen}
                            borderRadius={10}
                            onPress={() => this.postComment(this.props.navigation.state.params.key)}/>
                        <Button style={styles.buttonStyle}
                            title='Discard'
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
                    {rsvpButton}
                    <Button style={styles.buttonStyle}
                        title = 'Post comment'
                        backgroundColor={seaFoamGreen}
                        borderRadius={10}
                        onPress ={() => this.openModal()}/>
                </View>
                <FlatList style={styles.list}
                    data={this.state.commentArr}
                    scrollEnabled={this.state.scrollEnabled}
                    ListEmptyComponent={<Text style={styles.commentText}>No comments yet...</Text>}
                    renderItem={({item}) =>
                    <CommentCard
                        imageSource={item.imageSource?imageSource:defaultImg}
                        name={item.name}
                        date={item.date}
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
