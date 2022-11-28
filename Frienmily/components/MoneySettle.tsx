import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
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
                    setShowResult(<View style={styles.noTranscationContainer}>
                        <FontAwesome name="check" size={35} color="white"/>
                        <Text style={styles.text}>All Settled</Text></View>)
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
            return <View style={styles.txnDetails}>
                <Text>-${item.transcations_amount}</Text><Text> from group {item.group_name}</Text></View>
        } else {
            return <View style={styles.txnDetails}>
                <Text>+${item.transcations_amount}</Text><Text> from group {item.group_name}</Text></View>
        }

    }

    const styles = StyleSheet.create({
        searchButton: {
            margin: 5,
            fontSize: 20,
            backgroundColor: '#47b4b1',
            width: 120,
            height: 45,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        text: {
            padding: 20,
            borderRadius: 10,
            fontSize: 30,
            marginLeft: 20,
            marginRight: 20,
            color: 'white',
            // fontWeight:"300",
        },
        header: {
            height: '14%',
            alignItems: 'center',
            paddingTop: '15%',
            // marginBottom: '10%',
            width: '100%',
        },
        backButton: {
            position: 'absolute',
            left: 0,
            paddingTop: '65%',
            paddingLeft: '20%',
            fontSize: 25,
            // top: "110%",
            color:"white"
        },
        txnDetails: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 300
        },
        mainContainer:{
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        container: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: "1%",
            width: '98%',
            height: 80,
            padding: 20,
            paddingTop: "5%",
            paddingBottom:"5%",
            backgroundColor: 'white',
            //SHADOW
            borderRadius: 20,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {
                height: 4,
                width: 2,
            },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
        },
        resultContainer:{
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            // positon: "absolute",

            // height:200
        },
        noTranscationContainer:{            
            display: "flex",
        justifyContent: 'center',
        alignItems: 'center',

            flexDirection: 'column',
            // marginBottom: "5%",
            // // marginBottom:80,
            // width: '100%',
            // height: '80%',
            // padding: 20,
            // paddingTop: "5%",
            // paddingBottom:"5%",
            //SHADOW
            borderRadius: 20,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {
                height: 4,
                width: 2,
            },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,

        }
    });

    return (
        <SafeAreaView style={{ alignItems: 'center', backgroundColor: 'grey', flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Friends' as never)}>
                    <FontAwesome name="angle-left" size={35} color="white"/>
                </TouchableOpacity>
                {/* <Text style={styles.text}>Settlement</Text> */}
            </View>



            <View style={styles.mainContainer}>
            <View style={styles.resultContainer}><Text>{showResult}</Text></View>
            <View>{showButton}</View>   
            {/* <Image source={require('./img/money.gif')}
                style={{ width: 250, height: 250, borderRadius: 15 }} /> */}

            {/* <ScrollView style={{ minHeight: 100, maxHeight: 100 }}> */}
                {json.map((item: any, idx: number) => (
                    <View style={styles.container} key={idx}>{amount(item)}</View>
                ))}
            {/* </ScrollView> */}
        </View>
        </SafeAreaView>
    );
}
