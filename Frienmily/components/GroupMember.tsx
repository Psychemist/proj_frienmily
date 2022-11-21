import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FriendItem from './FriendItem';
import dotenv from 'dotenv';
import { REACT_APP_API_SERVER } from '@env';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GroupMemberItem from './GroupMamberItem';

export default function Friends() {
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const route = useRoute<any>()
  let groupID = route.params.groupId || ''
  let groupName = route.params.groupName || ''


  const [friendItemList, setFriendItemList] = useState([]);
  const [totalAmount, setTotalAmount]: any = useState();

  const styles = StyleSheet.create({
    header: {
      height: '14%',
      alignItems: 'center',
      // paddingTop: "1%",
      marginBottom: 0,
      width: '100%',
    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingLeft: '20%',
      fontSize: 25,
    },
    text: {
      fontSize: 25,
    },
  });
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    const loadFriendList = async () => {
      try {
        console.log('loadGroupList...');
        console.log("groupID :", groupID);

        const response = await fetch(`${REACT_APP_API_SERVER}/groups/getGroupMembers/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupID: groupID,
          }),
        });
        let json = [];
        if (response) {
          json = await response.json();
        }
        console.log("json :", json);
        setFriendItemList(json);
        let count: number = 0
        for (let j of json) {
          if (j.paid != null) {
            count += parseInt(j.paid)
          }
        }
        setTotalAmount(count)



      } catch (error) {
        console.log('error', error);
      }
    };
    if (isFocused) {
      loadFriendList();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>
        <Text style={styles.text}>{groupName}</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>Total expenses: ${totalAmount}</Text>
      </View>
      {/* <View style={{ alignItems: 'center', backgroundColor: '#F5F5F5' }}>
        <Text style={{ fontSize: 25, paddingBottom: '1%' }}>Friends</Text>
      </View> */}
      <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
        {friendItemList.map((item: any, idx: number) => (
          <GroupMemberItem items={item} key={idx} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
