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
        const key = this.props.navigation.state.params.key;
        var ref = firebase.database().ref('/events/' + key + '/comments/');
        ref.once('value').then((snapshot) => {
            this.snapshotToArray(snapshot);
        },
        (error) => {
            Alert.alert('Uh oh', 'Something went wrong fetching comments');
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

    postComment = () => {
        if(!this.state.comment){
            Alert.alert('Hey :(','Please do not post empty comments');
            return;
        }
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
            }
        });
    }

    openModal() {this.setState({modalVisible: true});}
    closeModal = () => {
        this.fetchComments();
        this.setState({modalVisible: false});
    }
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
