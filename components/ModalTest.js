import React from 'react';
import { CameraRoll, Image, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';


const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const screenWidth = window.width;
const screenHeight = window.height;


export default class AddEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            photos: [],
        }
    }

    getPhotos = () => {
        CameraRoll.getPhotos({
            first: 100,
        })
        .then(r => this.setState({ photos: r.edges }))
        .catch((err) => {
            alert('Error loading camera roll');
            return;
        });
    }

    openModal() {
        this.getPhotos();
        this.setState({modalVisible:true});
    }

    closeModal() {this.setState({modalVisible:false});}

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (<Text>Camera Roll Test</Text>),
        }
    };

    render(){
        return (
            <View>
                <Modal style={styles.modal}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}>
                    <ScrollView style={{flex: 1}}
                        contentContainerStyle={{ height: 100, width: 300 }}>
                        {this.state.photos.map((p, i) => {
                            return (
                                <Image
                                    key={i}
                                    style={{width: 300, height: 100,}}
                                    source={{ uri: p.node.image.uri }}/>
                            );
                        })}
                    </ScrollView>
                    <Button
                        onPress={() => this.closeModal()}
                        title="Close modal"/>
                </Modal>
                <Button
                    onPress={() => this.openModal()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight,
    }
});
