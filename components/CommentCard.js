import React from 'react';
import { Image,
    StyleSheet,
    Text,
    View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import propTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import { seaFoamGreen } from '../assets/styles/colors';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const screenWidth = window.width;

export default class CommentCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return (
            <View style={styles.cardContainer}>
                <View style={styles.info}>
                    <View style={styles.header}>
                        <Image
                            style={styles.imageStyle}
                            source={this.props.imageSource}/>
                        <Text style={styles.nameText}>{this.props.name}</Text>

                        <Text style={styles.dateText}>{this.props.date}</Text>
                    </View>
                    <Text style={styles.commentText}>{this.props.comment}</Text>
                </View>
            </View>
        );
    }
}

    const styles = StyleSheet.create({
        cardContainer: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderColor: 'gray',
            borderRadius: 10,
            backgroundColor: 'white',
            shadowOpacity: 0.35,
            shadowColor: '#3CAFAB',
            shadowRadius: 4,
            shadowOffset: { height: 0, width: 0 },
            marginLeft: 5,
            marginRight: 5,
            marginTop: 15,
            marginBottom: 10,
            width: screenWidth - 20,
        },
        info: {
            flexDirection: 'column',
        },
        text: {
            flexDirection: 'column',
            paddingLeft: 3,
            paddingBottom: 10,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 5,
            marginLeft: 5,
        },
        imageStyle: {
            width: 20,
            height: 20,
            borderRadius: 10,
        },
        nameText: {
            fontSize: 18,
            color: seaFoamGreen,
            fontFamily: 'Helvetica-Bold',
            marginLeft: 10,
        },
        commentText: {
            fontSize: 12,
            margin: 5,
            color: '#969696',
        },
    });
