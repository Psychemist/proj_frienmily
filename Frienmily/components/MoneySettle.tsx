import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
// import AddFriendSearchResult from './AddFriendSearchResult';
import GroupItem from './GroupItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function MoneySettle() {
    const route = useRoute()
    const isFocused = useIsFocused();
    let settleDetails = route.params.settleDetails
    let username = route.params.username
    console.log(settleDetails);
    console.log(username);


    const [showResult, setShowResult] = useState(<Text></Text>);

    useEffect(() => {
        const loadFriendList = async () => {
            try {
                if (settleDetails.case == 1) {
                    setShowResult(<Text>No transaction</Text>)
                } else if (settleDetails.case == 2) {
                    setShowResult(<Text>Have you received ${settleDetails.amount} from {username}?</Text>)
                } else if (settleDetails.case == 3) {
                    setShowResult(<Text>Did you paid ${settleDetails.amount} to {username}?</Text>)
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        if (isFocused) {
            loadFriendList();
        }
    }, [isFocused]);

    const userIdInRedux = useSelector((state: RootState) => state.user.userId);
    const [searchBar, setSearchBar] = React.useState('');

    const navigation = useNavigation();
    const [addFriendStatus, setAddFriendStatus] = React.useState(0);
    const [userDetail, setUserDetail]: any = React.useState();
    //   let userDetail: any;

    const confirmButton = async () => {

    };

    const showAlert = () => {
        Alert.alert('Please enter something to search', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    };
    const [buttonIsClicked, setButtonIsClick] = useState(false);

    const addFriendButton = async () => {
        setSearchBar('');
        setButtonIsClick(true);
        await fetch(`${REACT_APP_API_SERVER}/friends/addFriend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                targetID: userDetail.id,
                userID: userIdInRedux,
            }),
        });
    };

    const styles = StyleSheet.create({
        searchButton: {
            margin: 5,
            fontSize: 20,
            backgroundColor: '#907651',
            width: 120,
            height: 45,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        text: {
            fontSize: 30,
        },
        header: {
            height: '14%',
            alignItems: 'center',
            paddingTop: '15%',
            marginBottom: '35%',
            width: '100%',
        },
        backButton: {
            position: 'absolute',
            left: 0,
            paddingTop: '65%',
            paddingLeft: '20%',
            fontSize: 25,
            // top: "110%",
        },
    });

    return (
        <View style={{ alignItems: 'center', backgroundColor: '#F4E9DF', flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Friends' as never)}>
                    <FontAwesome name="angle-left" size={35} />
                </TouchableOpacity>

                <Text style={styles.text}>Settlement</Text>
            </View>
            <Image source={require('./img/money.gif')}
                style={{ width: 250, height: 250, borderRadius: 15 }} />
            <Text>{showResult}</Text>

            <TouchableOpacity style={styles.searchButton} onPress={confirmButton}>
                <Text>Settled</Text>
            </TouchableOpacity>
        </View>
    );
}
