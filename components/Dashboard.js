import React from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';
import EventCard from './EventCard';

import { seaFoamGreen } from '../assets/styles/colors';

import * as firebase from 'firebase';

var defaultImg = require('../assets/images/default-01.jpg');

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            eventArr: [],
        }
    }

    componentWillMount = () => {
        var tempArr = [];
        firebase.database().ref('/events/').orderByChild('date').once('value').then((snapshot) => {
            tempArr = this.snapshotToArray(snapshot);
            this.setState({
                eventArr: tempArr
            });
        });

        var user = firebase.auth().currentUser;
        firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
            var userData = snapshot.val();
        });
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

    viewProfile = (name) => {
        this.props.navigation.navigate('Profile', {name});
    }

    viewEvent = (title, date, location, host, description, volunteersHave, volunteersNeed,
                    equipment, time, imageSource, key, navigate) => {
        navigate('EventPage', {title, date, location, host, description, volunteersHave, volunteersNeed,
                       equipment, time, key, imageSource});
    }

    static navigationOptions = ({ navigation }) => {
        return {
            gesturesEnabled: false,
            headerLeft: (
                <Icon
                    name='account-circle'
                    type='material-community'
                    iconStyle={styles.headerLeft}
                    onPress={() => navigation.navigate('Profile')}/>),
            headerTitle: (<Text style={styles.headerTitle}>Dashboard</Text>),
            headerRight: (
                <Icon
                    name='plus-box'
                    type='material-community'
                    iconStyle={styles.headerRight}
                    onPress={() => navigation.navigate('AddEvent')}/>),
       }
   }

    render(){
        const{ navigate } = this.props.navigation;
        console.log(this.state.eventArr)
        return (
            <View style={styles.bgContainer}>
                <FlatList style={styles.list}
                    data={this.state.eventArr}
                    renderItem={({item}) =>
                    <EventCard
                        title={item.title}
                        date={item.date}
                        location={item.location}
                        host={item.host}
                        description={item.description}
                        volunteersHave={item.volunteersHave}
                        volunteersNeed={item.volunteersNeed}
                        equipment={item.equipment}
                        time={item.time}
                        imageSource={item.imageSource?imageSource:defaultImg}
                        onPress={() => this.viewEvent(item.title,
                                                        item.date,
                                                        item.location,
                                                        item.host,
                                                        item.description,
                                                        item.volunteersHave,
                                                        item.volunteersNeed,
                                                        item.equipment,
                                                        item.time,
                                                        item.imageSource,
                                                        item.key,
                                                        navigate)}>
                    </EventCard>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingTop: 10,
  },
  headerLeft: {
      color: seaFoamGreen,
      paddingLeft: 20,
  },
  headerTitle: {
      fontSize: 20,
      color: seaFoamGreen,
      fontFamily: 'Helvetica-Bold',
  },
  headerRight: {
      color: seaFoamGreen,
      paddingRight: 20,
  },
});
