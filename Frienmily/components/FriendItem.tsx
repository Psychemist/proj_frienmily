import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_APP_API_SERVER } from '@env';
import { json } from 'express';
interface FriendItemProps {
    items: any;
    key: number;
}

export default function FriendItem(props: FriendItemProps) {
    const navigation = useNavigation();

    const isFocused = useIsFocused();
    const [showResult, setShowResult] = useState(<Text></Text>);
    const [json, setJson] = useState();
    useEffect(() => {
        const loadFriendList = async () => {
            try {
                // console.log('loadCalculation');
                console.log(
                    `user_id: ${props.items.user_id}, user_friend_id: ${props.items.user_friend_id}`,
                );
                const response = await fetch(
                    `${REACT_APP_API_SERVER}/friends/calculateMoney/`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: props.items.user_id,
                            user_friend_id: props.items.user_friend_id,
                        }),
                    },
                );
                let json;
                if (response) {
                    json = await response.json();
                }
                setJson(json)
                console.log("json :", json);
                if (json.case == 1) {
                    setShowResult(<Text>No txn</Text>);
                } else if (json.case == 2) {
                    setShowResult(
                        <Text style={styles.green}>
                            +{Math.round(json.amount * 10) / 10}
                        </Text>,
                    );
                } else if (json.case == 3) {
                    setShowResult(
                        <Text style={styles.red}>
                            -{Math.round(json.amount * 10) / 10}
                        </Text>,
                    );
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        if (isFocused) {
            loadFriendList();
        }
    }, [isFocused]);

    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
        },
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            padding: 10,
            paddingTop: 32,
            paddingBottom: 32,
            backgroundColor: '#E2D8CF',
            //SHADOW
            shadowOpacity: 0.8,
            shadowRadius: 3,
            shadowOffset: {
                height: 1,
                width: 1,
            },
        },
        green: {
            color: 'green',
        },
        red: {
            color: 'red',
        },
    });

    return (
        <TouchableOpacity style={styles.container} onPress={() =>
            navigation.navigate(
                'MoneySettle' as never,
                { settleDetails: json, username: props.items.username } as never,
            )
        }>
            <FontAwesome name="user-circle-o" size={30} />
            <View>
                <Text style={styles.text}>{props.items.username}</Text>
            </View>
            <View>
                <Text style={styles.text}>{showResult}</Text>
            </View>
            <FontAwesome name="angle-right" size={30} />
        </TouchableOpacity>
    );
}
