import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AddFriendSearchResult from './AddFriendSearchResult';
import GroupItem from './GroupItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
            width: 120,
            height: 45,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
        },
        resultContainer: {
            // backgroundColor: "pink",
            minHeight: 450,
            maxHeight: 450,
            width: "100%",
            flexGrow: 1,
            paddingLeft: 40,
            paddingRight: 40,
        },
        text: {
            fontSize: 30,
        },
        header: {
            height: "14%",
            alignItems: "center",
            paddingTop: "15%",
            marginBottom: "10%",
            width: "100%"
        },
        backButton: {
            position: 'absolute',
            left: 0,
            paddingTop: "65%",
            paddingLeft: "20%",
            fontSize: 25
            // top: "110%",
        }
    });


    return (
        <View style={{ alignItems: 'center', backgroundColor: "#F4E9DF", flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={()=> navigation.navigate('Friends' as never)}>
                    <FontAwesome name='angle-left' size={35} />
                </TouchableOpacity>

                <Text style={styles.text}>Add Friends</Text>
            </View>
            <Text><FontAwesome name='mobile' size={50} />   Enter your friend's phone number:</Text>
            <TextInput placeholder="Phone number or Email" value={groupName} onChangeText={setGroupName} style={styles.input} />

            <TouchableOpacity style={styles.searchButton} onPress={submitButton}>
                <Text>Search</Text>
            </TouchableOpacity>

            <ScrollView style={styles.resultContainer}>
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
                <AddFriendSearchResult />
            </ScrollView>


        </View >
    )
}