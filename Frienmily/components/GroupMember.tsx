import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GroupMemberItem from './GroupMemberItem';

export default function Friends() {
  const dispatch = useDispatch()
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const route = useRoute<any>()
  let groupID = route.params.groupId || ''
  let groupName = route.params.groupName || ''


  const [friendItemList, setFriendItemList] = useState([]);
  const [totalAmount, setTotalAmount]: any = useState();

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

  const onDeleteGroup = () => {
    Alert.alert(
      'Are you sure you want to delete this group?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: async () => {
            await deleteEmptyGroup()
          }
        },
      ]
    );
  }

  const deleteEmptyGroup = async () => {
    try {
      let res = await fetch(`${REACT_APP_API_SERVER}/groups/deleteEmptyGroup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupID: groupID,
        }),
      });
      let data = [];
      if (res) {
        data = await res.json();
      }
      if (data.message == "This group is deleted") {
        console.log("hihihihihi")
        Alert.alert(
          'This group is deleted.',
          '',
          [
            {
              text: 'OK', onPress: async () => {
                navigation.navigate('HomeTab' as never)
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'This group cannot be deleted. Please make sure the shopping list and receipt record are empty.',
          '',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'cancel',
            }
          ]
        );
      }

    } catch (error) {
      console.log('error', error);
    }
  }







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
      borderRadius: 10,
      fontSize: 30,
      fontWeight: "bold",
    },
    groupNameWrapper: {
      position: "absolute",
      top: 120,
      padding: '1%'
    },
    totalText: {
      fontWeight: "bold",
      fontSize: 25,
      marginBottom: "1%"
    },
    deleteGroupBtn: {
      // borderColor: '#47b4b1',
      // borderWidth: 2,
      backgroundColor: "rgb(236,64,52)",
      height: 60,
      width: "95%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
    },
    DeleteGroupBtnText: {
      fontSize: 20,
      color: 'white',
      // fontWeight: 'bold',
    },

  });
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#F5F5F5' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>
        <Text style={styles.text}>Group Settings</Text>
      </View>

      <View style={styles.groupNameWrapper}>
        <Text style={{ fontSize: 23, fontWeight: "300" }}>{groupName}</Text>
      </View>
      <Text style={styles.text}></Text>
      <Text style={styles.totalText}>Total expenses: ${totalAmount}</Text>

      {/* <View style={{ alignItems: 'center', backgroundColor: '#F5F5F5' }}>
        <Text style={{ fontSize: 25, paddingBottom: '1%' }}>Friends</Text>
      </View> */}
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}>
        {friendItemList.map((item: any, idx: number) => (
          <GroupMemberItem items={item} key={idx} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.deleteGroupBtn}
        onPress={onDeleteGroup}>
        <Text style={styles.DeleteGroupBtnText}>Delete Group</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
