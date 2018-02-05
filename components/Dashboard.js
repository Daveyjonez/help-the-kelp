import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

class Dashboard extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text> Dashboard Page </Text>
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

export default Dashboard;
