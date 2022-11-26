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
    const route = useRoute<any>()
    const isFocused = useIsFocused();
    const [json, setJson] = useState([]);
    let settleDetails = route.params.settleDetails || ''
    let username = route.params.username || ''
    let thisUserID = route.params.thisUserID || ''
    let friendUserID = route.params.friendUserID || ''
    console.log(settleDetails);
    console.log(username);
    console.log(thisUserID);
    console.log(friendUserID);




    const [showResult, setShowResult] = useState(<Text></Text>);
    const [showButton, setShowButton] = useState(<Text></Text>);

    useEffect(() => {
        const loadFriendList = async () => {
            try {
                if (settleDetails.case == 1) {
                    setShowResult(<Text>No transaction</Text>)
                    // setShowButton()
                } else if (settleDetails.case == 2) {
                    setShowResult(<Text>Have you received ${settleDetails.amount} from {username}?</Text>)
                    setShowButton(
                        <TouchableOpacity style={styles.searchButton} onPress={moneySettle}>
                            <Text>Settled</Text>
                        </TouchableOpacity>
                    )
                } else if (settleDetails.case == 3) {
                    setShowResult(<Text>Did you paid ${settleDetails.amount} to {username}?</Text>)
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        const getAllTxnRecord = async () => {
            try {
                const response = await fetch(
                    `${REACT_APP_API_SERVER}/friends/getAllTxnRecord/`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: thisUserID,
                            user_friend_id: friendUserID,
                        }),
                    },
                );
                let json;
                if (response) {
                    json = await response.json();
                }
                setJson(json)
            } catch (error) {
                console.log('error', error);
            }
        }
        if (isFocused) {
            loadFriendList();
            getAllTxnRecord()
        }
    }, [isFocused]);

    const userIdInRedux = useSelector((state: RootState) => state.user.userId);

    const navigation = useNavigation();

    const moneySettle = async () => {
        await fetch(`${REACT_APP_API_SERVER}/receipts/settle/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                targetID: thisUserID,
                payerID: friendUserID,
            }),
        });
        setShowResult(<Text>Transactions settled</Text>)
        setShowButton(<Text></Text>)

    };

    const amount = (item: any) => {
        if (item.debitor_id == thisUserID) {
            return <View style={styles.txnDetails}><Text>-${item.transcations_amount}</Text><Text> from group {item.group_name}</Text></View>
        } else {
            return <View style={styles.txnDetails}><Text>+${item.transcations_amount}</Text><Text> from group {item.group_name}</Text></View>
        }

    }

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
        txnDetails: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 300
        }
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
            <ScrollView style={{ minHeight: 100, maxHeight: 100 }}>
                {json.map((item: any, idx: number) => (
                    <View key={idx}>{amount(item)}</View>
                ))}
            </ScrollView>
            <Image source={require('./img/money.gif')}
                style={{ width: 250, height: 250, borderRadius: 15 }} />
            <Text>{showResult}</Text>
            <View>{showButton}</View>

        </View>
    );
}
