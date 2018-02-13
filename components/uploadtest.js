import React from 'react';
import { Image,
        Text,
        View } from 'react-native';
import { Button } from 'react-native-elements';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import b64 from 'base64-js'

export default class uploadtest extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            image: null,
            imageByte: [],
            imageData: {}
        }
    }

    savePhoto = () => {
        var storeRef = firebase.storage().ref()
        console.log(this.state.imageByte) //prints a Uint8Array to term
        console.log(this.state.imageByte === Uint8Array) //prints false
        storeRef.child('test.jpg').put(this.state.imageByte).then(snapshot => {
            console.log("uploaded image!")
        })
        .catch(function(error){
            console.log(error.toString())
        });
    }

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });
        if (!result.cancelled) {
            const byteArray = b64.toByteArray(result.base64);
            this.setState({
                image: result.uri,
                imageByte: byteArray,
                imageData: {contentType: 'image/jpg'},
            });
        }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (<Text>Test</Text>),
        }
    };
    render(){
        var { image } = this.state;

        return (
            <View>
            {image &&
                <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
                <Button
                    title='Choose event image'
                    paddingTop={20}
                    onPress={this.pickImage}/>
                <Button
                    title='Save image'
                    paddingTop={20}
                    onPress={this.savePhoto()}/>
            </View>
        );
    }
}
