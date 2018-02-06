import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import { seaFoamGreen } from '../assets/styles/colors';

export default class Profile extends React.Component {
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
           iconStyle={styles.headerLeft}
           />),
       headerTitle: (
           <Icon
               name='format-list-bulleted'
               type='material-community'
               iconStyle={styles.headerTitle}
               onPress={() => navigation.navigate('Dashboard')}
           />),
       headerRight: (
           <Icon
               name='plus-box'
               type='material-community'
               iconStyle={styles.headerRight}
           />),
       }
   }

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    Welcome, {this.props.email}, to the profile page
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
  headerLeft: {
      color: seaFoamGreen,
      paddingLeft: 20,
  },
  headerTitle: {
      color: seaFoamGreen,
  },
  headerRight: {
      color: seaFoamGreen,
      paddingRight: 20,
  },
});
