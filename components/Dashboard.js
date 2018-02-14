import React from 'react';
import { Alert,
        Button,
        FlatList,
        ScrollView,
        StyleSheet,
        Text,
        View} from 'react-native';
import { Icon } from 'react-native-elements';
import EventCard from './EventCard';

import { seaFoamGreen } from '../assets/styles/colors';

import * as firebase from 'firebase';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            eventArr: [],
        }
    }

    componentWillMount = () => {
        console.log('---- WILL MOUNT DASHBOARD ----');
        let tempArr = [];
        try{
            let ref = firebase.database().ref('/events/');
            ref.once('value', (snapshot) => {
                tempArr = this.snapshotToArray(snapshot);
                this.setState({
                    eventArr: tempArr,
                })
            });
        }
        catch(error){
            Alert.alert('Uh oh', 'Something went wrong loading your dashboard');
            return;
        }
    }

    snapshotToArray = snapshot => {
        let retArr = [];
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            item.volunteersHave = Object.keys(item.attendees).length;
            retArr.push(item);
        });
        return retArr;
    };

    viewProfile = (name) => {
        this.props.navigation.navigate('Profile');
    }

    viewEvent = (title, date, location, host, description, volunteersHave, volunteersNeed,
                    equipment, time, key, navigate) => {
                        console.log('---- NAVIGATING EVENT PAGE ----');
        this.props.navigation.navigate('EventPage', {title, date, location, host,
            description, volunteersHave, volunteersNeed, equipment, time, key});
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
                        key={item.key}
                        onPress={() => this.viewEvent(item.title,
                                                        item.date,
                                                        item.location,
                                                        item.host,
                                                        item.description,
                                                        item.volunteersHave,
                                                        item.volunteersNeed,
                                                        item.equipment,
                                                        item.time,
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
