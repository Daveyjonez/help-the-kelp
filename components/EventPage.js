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

const screenWidth = window.width;


export default class EventPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            comment: '',
            commentArr: [],
        }
    }

    componentWillMount() {
        this.fetchComments();
    }

    snapshotToArray = snapshot => {
        var returnArr = [];
        snapshot.forEach(childSnapshot => {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };

    fetchComments = () => {
        var tempArr = [];
        var key = this.props.navigation.state.params.key;
        firebase.database().ref('/events/' + key + '/comments/').once('value').then((snapshot) => {
            tempArr = this.snapshotToArray(snapshot);
            this.setState({
                commentArr: tempArr
            });
        });
    }

    openModal() {this.setState({modalVisible:true});}
    closeModal = () => {
        this.fetchComments();
        this.setState({modalVisible:false});
    }

    postComment = (key) => {
        var tempArr = [];
        firebase.database().ref().child('events/' + key + '/comments/').push({
            comment: this.state.comment,
        });
        this.closeModal();
    }

    static navigationOptions = {
        headerTintColor: seaFoamGreen

    }

    render(){
        console.log(this.props)
        return (
            <View style={styles.container}>
                <Modal
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
                    <Text style={styles.locationText}>Location:{this.props.navigation.state.params.location}</Text>
                    <Text style={styles.locationText}>Host:{this.props.navigation.state.params.host}</Text>
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
                        title = 'RSVP'
                        backgroundColor={seaFoamGreen}
                        borderRadius={10}/>
                    <Button style={styles.buttonStyle}
                        title = 'Post comment'
                        backgroundColor={seaFoamGreen}
                        borderRadius={10}
                        onPress ={() => this.openModal()}/>
                </View>
                <FlatList style={styles.list}
                    data={this.state.commentArr}
                    renderItem={({item}) =>
                    <CommentCard
                        imageSource={item.imageSource?imageSource:defaultImg}
                        name={item.name}
                        date={item.date}
                        comment={item.comment}>
                    </CommentCard>}
                />
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
    },
    locationText: {
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
    headerLeft: {
        color: seaFoamGreen,
        paddingLeft: 20,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
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
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        paddingTop: 20,
        width: 150,
    },
});
