import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

export default class AddEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
       headerLeft: (
           <Icon
           name='account-circle'
           type='material-community'
           paddingLeft={20}
           />),
       headerTitle: (
           <Icon
               name='format-list-bulleted'
               type='material-community'
           />),
       headerRight: (
           <Icon
               name='plus-box'
               type='material-community'
               paddingRight={20}
           />),
       }
   }

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    Welcome to the add event page
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
