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
                    setShowResult(<Text style={styles.text}>{username} owes you ${settleDetails.amount}</Text>)
                    setShowButton(
                        <TouchableOpacity style={styles.searchButton} onPress={moneySettle}>
                            <View style={styles.settledbutton}>
                                <Text style={styles.settledButtonText}>Press to Settle</Text>
                            </View>
                        </TouchableOpacity>
                    )
                } else if (settleDetails.case == 3) {
                    setShowResult(<Text style={styles.text}>You owe {username} ${settleDetails.amount}</Text>)
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
        setShowResult(<Text style={styles.text}>Transactions Settled!</Text>)
        setShowButton(<Text></Text>)

    };

    const amount = (item: any) => {
        if (item.debitor_id == thisUserID) {
            return <View style={styles.txnDetails}>
                <Text style={styles.youOweRed}>-${item.transcations_amount}</Text><Text style={styles.oweGroupName}>{item.group_name}</Text></View>
        } else {
            return <View style={styles.txnDetails}>
                <Text style={styles.oweYouGreen}>+${item.transcations_amount}</Text><Text style={styles.oweGroupName}>{item.group_name}</Text></View>
        }

    }

    const styles = StyleSheet.create({
        pageContainer:{
             alignItems: 'center',
             backgroundColor: '#47b4b1',
             flex: 1,
             display: "flex",
             justifyContent: 'center',
             flexDirection: 'column',
        },
        searchButton: {
            // margin: 5,
            fontSize: 20,
            backgroundColor: '#47b4b1',
            // width: 120,
            // height: 45,
            // borderRadius: 100,
            // marginBottom: 20,
        },
        text: {
            padding: 20,
            borderRadius: 10,
            // fontSize: 23,
            marginLeft: 20,
            marginRight: 20,
            color: 'white',
            // fontWeight:"300",
            fontSize: 28,
            fontWeight: "bold",
            // color: "#47b4b1",
        },
        oweText:{
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
            flexDirection: 'column',
        },
        container: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: "1%",
            width: '100%',
            height: 80,
            padding: 20,
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
            fontSize: 40,
            paddingRight:"10%",
            fontWeight:"300",
            color:"gray",
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
            borderRadius:10,
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
            fontWeight:"300",
            color:"gray",
        },
        settledButtonText: {
            // padding: 20,
            // borderRadius: 10,
            fontSize: 20,
            // marginLeft: 20,
            // marginRight: 20,
            color: 'white',
            fontWeight:"bold",
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
            paddingRight:"10%",
            fontWeight:"300",
            color:"gray",
            // paddingTop: "5%",
            // paddingBottom:"5%",
          },
          oweGroupName:{
            fontSize: 20,
            // paddingRight:"10%",
            fontWeight:"300",
            color:"gray",
          },
          youOweRed:{
            fontSize: 20,
            // paddingRight:"10%",
            fontWeight:"300",
            color:"#F84C27",
          },
          oweYouGreen:{
            fontSize: 20,
            // paddingRight:"10%",
            fontWeight:"300",
            color:"#02CD9C",
          }
    });

    return (
        
        <SafeAreaView style={styles.pageContainer}>
            <StatusBar barStyle="light-content" />
            <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Friends' as never)}>
                    <FontAwesome name="angle-left" size={35} color="white"/>
                </TouchableOpacity>
                {/* <Text style={styles.text}>Settlement</Text> */}




            <View style={styles.mainContainer}>
            <View style={styles.resultContainer}><Text>{showResult}</Text></View>

            {/* <Image source={require('./img/money.gif')}
                style={{ width: 250, height: 250, borderRadius: 15 }} /> */}

            <ScrollView style={{ minHeight: 100, maxHeight: 200 }}>
            <View>{showButton}</View>   
                {json.map((item: any, idx: number) => (
                    <View style={styles.container} key={idx}><Text>{amount(item)}</Text></View>
                ))}
            </ScrollView>

        </View>
        </SafeAreaView>
    );
}
