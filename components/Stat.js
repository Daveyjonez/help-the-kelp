import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';

export default class EventCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Icon
                    name={this.props.iconName}
                    type={this.props.iconType}
                    color={this.props.iconColor}/>
                <Text style={styles.numText}>{this.props.numText}</Text>
                <Text style={styles.titleText}>{this.props.titleText}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    numText: {
        fontSize: 12,
        color: '#969696',
        fontFamily: 'Helvetica-Bold',
    },
    titleText: {
        fontSize: 12,
        color: '#969696',
        fontFamily: 'Helvetica',
    },
});
