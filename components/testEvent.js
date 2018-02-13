import React from 'react';
import { Alert,
        FlatList,
        Image,
        Modal,
        StyleSheet,
        Text,
        View} from 'react-native';
import { Button } from 'react-native-elements';
import { Input }from './Input';

import * as firebase from 'firebase';

export default class testEvent extends React.Component {
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

    fetchComments = () => {
        console.log('---- FETCHING COMMENTS ----');
        const eventKey = this.props.navigation.state.params.key;
        let tempArr = [];
        console.log('event key: ' + eventKey);
        const ref = firebase.database().ref('/events/' + eventKey + '/comments/');
        ref.on('value', (snapshot) => {
            console.log('---- COMMENT THREAD ----');
            console.log(snapshot);
            newComments = this.snapshotToArray(snapshot);
        },
        (error) => {
            Alert.alert('Uh oh', 'Something went wrong fetching comments');
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
            name: name,
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

    openModal() {this.setState({modalVisible: true});}
    closeModal = () => {this.setState({modalVisible: false});}

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (<Text style={styles.headerTitle}>Event Page</Text>),
        }
    }
    render(){
        return (
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.closeModal()}>
                    <View style={styles.modalComment}>
                        <Input
                            placeholder = 'Your comment'
                            onChangeText = {comment => this.setState({comment})}
                            value = {this.state.description}
                            multiline={true}
                            maxLength={140}/>
                        <Button
                            title='Submit'
                            onPress={() => this.postComment()}/>
                        <Button
                            title='Discard'
                            onPress={() => this.closeModal()}/>
                    </View>
                </Modal>

                <Button
                    title = 'Write comment'
                    onPress ={() => this.openModal()}/>
                <FlatList
                    data={this.state.commentArr}
                    scrollEnabled={this.state.scrollEnabled}
                    contentContainerStyle={{alignItems:'center'}}
                    renderItem={({item}) =><Text>{item.comment}</Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalComment: {
        paddingTop: 100,
    }
});
