import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_APP_API_SERVER } from '@env';

export default function MoneySettle() {
    const route = useRoute<any>()
    const isFocused = useIsFocused();
    const [notYetSettled, setNotYetSettled] = useState([]);
    const [settled, setSettled] = useState([]);
    let settleDetails = route.params.settleDetails || ''
    let username = route.params.username || ''
    let thisUserID = route.params.thisUserID || ''
    let friendUserID = route.params.friendUserID || ''
    let oweAmount = parseFloat(settleDetails.amount).toFixed(1)
    const [showResult, setShowResult] = useState(<Text></Text>);
    const [showButton, setShowButton] = useState(<Text></Text>);

    useEffect(() => {
        if (isFocused) {
            loadFriendList();
            getAllTxnRecord()
        }
    }, [isFocused]);
    const loadFriendList = async () => {
        try {
            if (settleDetails.case == 1) {
                setShowResult(<View style={styles.noTranscationContainer}>
                    <FontAwesome name="check" size={35} color="white" />
                    <Text style={styles.text}>All Settled</Text></View>)
            } else if (settleDetails.case == 2) {
                setShowResult(<Text style={styles.text}>{username} owes you ${oweAmount}</Text>)
                setShowButton(
                    <TouchableOpacity style={styles.searchButton} onPress={moneySettle}>
                        <View style={styles.settledbutton}>
                            <Text style={styles.settledButtonText}>Press to Settle</Text>
                        </View>
                    </TouchableOpacity>
                )
            } else if (settleDetails.case == 3) {
                setShowResult(<Text style={styles.text}>You owe {username} ${oweAmount}</Text>)
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
            setNotYetSettled(json.notYetSettled)
            setSettled(json.settled)
        } catch (error) {
            console.log('error', error);
        }
    }
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
        setShowResult(<Text style={styles.text}>Transactions Settled!</Text>)
        setShowButton(<Text></Text>)

    };
    const amount = (item: any) => {
        if (item.debitor_id == thisUserID) {
            return <View style={styles.txnDetails}>
                <View><Text style={styles.youOweRed}>-${item.transcations_amount}</Text></View>
                <View style={styles.oweGroupNameWrapper}><Text style={styles.oweGroupName}>{item.group_name}</Text></View>
                </View>
        } else {
            return <View style={styles.txnDetails}>
                <View><Text style={styles.oweYouGreen}>+${item.transcations_amount}</Text></View>
                <View style={styles.oweGroupNameWrapper}><Text style={styles.oweGroupName}>{item.group_name}</Text></View>
                </View>
        }

    }
    const styles = StyleSheet.create({
        oweGroupNameWrapper:{
            // marginLeft:"20%",
            width:"60%",
            alignItems: 'flex-start',
            // flexDirection: 'row',
        },
        pageContainer: {
            alignItems: 'center',
            backgroundColor: '#47b4b1',
            flex: 1,
            display: "flex",
            // justifyContent: 'center',
            flexDirection: 'column',
        },
        searchButton: {
            // margin: 5,
            fontSize: 20,
            backgroundColor: '#47b4b1',
            width: '100%',
        },
        text: {
            padding: 20,
            borderRadius: 10,
            // fontSize: 23,
            marginLeft: 20,
            marginRight: 20,
            color: 'white',
            fontWeight: "bold",
            fontSize: 25,
            // fontWeight: "bold",
            // color: "#47b4b1",
        },
        oweText: {
            paddingBottom: 10,
            borderRadius: 10,
            fontSize: 25,
            // marginLeft: 20,
            marginRight: 20,
            color: 'white',
            fontWeight: "300",
        },
        backButton: {
            position: 'absolute',
            left: 20,
            top: 20,
            paddingTop: '65%',
            paddingLeft: '10%',
            fontSize: 25,
            // top: "110%",
            color: "white"
        },
        txnDetails: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            margin: "2%",
            width: '98%',
            height: 80,
            padding: 20,
            // paddingRight: 20,
            paddingTop: "5%",
            paddingBottom:"5%",
            backgroundColor: 'white',
            //SHADOW
            borderRadius: 10,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {
                height: 4,
                width: 2,
            },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
        },
        mainContainer: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 40,
            width: '80%',
        },
        container: {
            // display: "flex",
            // justifyContent: 'space-between',
            // alignItems: 'center',
            // flexDirection: 'row',
            marginTop: "1%",
            // width: 350,
            // height: 80,
            // padding: 20,
            // paddingTop: "5%",
            // paddingBottom: "5%",
            // backgroundColor: 'white',
            // //SHADOW
            // // borderRadius: 10,
            // shadowOpacity: 0.1,
            // shadowRadius: 1,
            // shadowOffset: {
            //     height: 4,
            //     width: 2,
            // },
            // borderBottomColor: 'grey',
            // borderBottomWidth: 0.2,
            // fontSize: 40,
            // paddingRight: "10%",
            // fontWeight: "300",
            // color: "gray",
        },
        settledbutton: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: "4%",
            marginBottom: "1%",
            width: "100%",
            height: 50,
            // padding: 20,
            // paddingTop: "5%",
            // paddingBottom:"5%",
            backgroundColor: '#02CD9C',
            // //SHADOW
            // borderTopLeftRadius:20,
            // borderTopRightRadius:20,
            // borderBottomLeftRadius:20,
            // borderBottomRightRadius:20,
            borderRadius: 10,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {
                height: 4,
                width: 2,
            },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
            fontSize: 40,
            // paddingRight:"10%",
            fontWeight: "300",
            color: "gray",
        },
        settledButtonText: {
            // padding: 20,
            // borderRadius: 10,
            fontSize: 20,
            // marginLeft: 20,
            // marginRight: 20,
            color: 'white',
            fontWeight: "bold",
        },
        resultContainer: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: "wrap",
            // paddingLeft: "5%",
            // paddingRight: "5%",
            paddingBottom: "2%",
            // marginTop: "1%",
            height: '13%',
            marginBottom: 10,
        },
        noTranscationContainer: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',

            flexDirection: 'column',
            // marginBottom: "5%",
            // // marginBottom:80,
            // width: '100%',
            // height: '80%',
            // padding: 20,
            paddingTop: "15%",
            // paddingBottom:"5%",
            //SHADOW
            borderRadius: 10,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {
                height: 4,
                width: 2,
            },
            // borderBottomColor: 'grey',
            // borderBottomWidth: 0.2,

        },
        groupName: {
            fontSize: 40,
            paddingRight: "10%",
            fontWeight: "300",
            color: "gray",
            marginRight:"2%"
            // paddingTop: "5%",
            // paddingBottom:"5%",
        },
        oweGroupName: {
            fontSize: 20,
            // paddingRight:"10%",
            fontWeight: "300",
            color: "gray",
            maxWidth:"100%",
            // height: 50,
            marginRight:"5%"
            
        },
        youOweRed: {
            fontSize: 20,
            // paddingRight:"10%",
            fontWeight: "300",
            color: "#F84C27",
        },
        oweYouGreen: {
            fontSize: 20,
            // paddingRight:"10%",
            fontWeight: "300",
            color: "#02CD9C",
        },
        scrollView: {
            minHeight: notYetSettled.length == 0 ? 500 : 220,
            maxHeight: notYetSettled.length == 0 ? 500 : 220,
            marginBottom: 20
        }
    });

    return (

        <SafeAreaView style={styles.pageContainer}>
            <StatusBar barStyle="light-content" />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Friends' as never)}>
                <FontAwesome name="angle-left" size={35} color="white" />
            </TouchableOpacity>
            {/* <Text style={styles.text}>Settlement</Text> */}




            <View style={styles.mainContainer}>
                <View style={styles.resultContainer}><Text>{showResult}</Text></View>
                <View style={{ width: '100%' }}>{showButton}</View>
                {notYetSettled.length == 0 ? null :
                    <ScrollView style={styles.scrollView}>
                        {notYetSettled.map((item: any, idx: number) => (
                            <View style={styles.container} key={idx}><Text>{amount(item)}</Text></View>
                        ))}
                    </ScrollView>}

                <View style={{ width: '100%', backgroundColor: "lightgrey", borderRadius: 10, height:50, display: "flex", justifyContent: 'center',alignItems:"center"}}><Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Settled History</Text></View>
                <ScrollView style={styles.scrollView}>
                    {settled.map((item: any, idx: number) => (
                        <View style={styles.container} key={idx}><Text>{amount(item)}</Text></View>
                    ))}
                    {settled.length == 0 ? <View><Text style={{ color: 'white', fontSize: 17, paddingTop: 20 }}>(No transactions record)</Text></View> : null}
                </ScrollView>

            </View>
        </SafeAreaView>
    );
}
