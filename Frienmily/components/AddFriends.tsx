import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AddFriendSearchResult from './AddFriendSearchResult';

export default function AddFriends() {
    const [groupName, setGroupName] = React.useState("");

    const navigation = useNavigation();

    const submitButton = () => {
        if (groupName == "") {
            showAlert()
        } else {
            navigation.navigate('Friends' as never)
        }

    }


    const showAlert = () => {
        Alert.alert(
            'Please enter something to search',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        );
    }

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            minWidth: 300,
            maxWidth: 300,
            borderRadius: 10
        },
        searchButton: {
            margin: 5,
            fontSize: 20,
            backgroundColor: "#907651",
            width: 70,
            height: 70,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        resultContainer: {
            backgroundColor: "pink",
            minHeight: 400,
            width: "100%",
            alignItems: 'center',
        }
    });


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: "#F4E9DF", flex: 1 }}>
            <Text>Enter your friend's phone number:</Text>
            <TextInput placeholder="Phone number or Email" value={groupName} onChangeText={setGroupName} style={styles.input} />

            <TouchableOpacity style={styles.searchButton} onPress={submitButton}>
                <Text>Search</Text>
            </TouchableOpacity>

            <View style={styles.resultContainer}>
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
            </View>


        </View >
    )
}