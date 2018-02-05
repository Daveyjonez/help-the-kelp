import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Input = ({Label, value, onChangeText, placeholder, secureTextEntry}) => {
    return (
      <View style = {styles.container}>
        <TextInput
            autoCorrect = {false}
            onChangeText = {onChangeText}
            placeholder = {placeholder}
            style = {styles.input}
            secureTextEntry = {secureTextEntry}
            value = {value}
        />
      </View>
    );
  }

 const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      width: '100%',
      borderColor: '#eee',
      borderBottomWidth: 2,
      padding: 10,
    },
    label: {
      padding: 5,
      paddingBottom: 0,
      color: '#333',
      fontSize: 17,
      fontWeight: '700',
      width: '100%',
    },
    input: {
      paddingRight: 5,
      paddingLeft: 5,
      paddingBottom: 2,
      color: '#333',
      fontSize: 18,
      width: '100%',
    }
  });

export { Input };
