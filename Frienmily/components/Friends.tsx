import { useNavigation } from '@react-navigation/native';
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

export default function Friends() {
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);

  const [friendItemList, setFriendItemList] = useState([]);

  const styles = StyleSheet.create({
    floatButtonText: {
      fontSize: 50,
      color: 'white',
      position: 'absolute',
      right: 19,
      bottom: 7,
    },
    circleButton: {
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: '#47b4b1',
      position: 'absolute',
      right: 30,
      bottom: 30,
      opacity: 0.8,
    },
  });
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    const loadFriendList = async () => {
      try {
        console.log('loadFriendList...');
        const response = await fetch(`${REACT_APP_API_SERVER}/friends/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userID: userIdInRedux,
          }),
        });
        let json = [];
        if (response) {
          json = await response.json();
        }
        // console.log(json);
        setFriendItemList(json);
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
      <View style={{ alignItems: 'center', backgroundColor: '#F5F5F5' }}>
        <Text style={{ fontSize: 25, paddingBottom: '1%' }}>Friends</Text>
      </View>
      <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
        {friendItemList.map((item: any, idx: number) => (
          <FriendItem items={item} key={idx} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          navigation.navigate('Add friends' as never);
        }}>
        <Text style={styles.floatButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
