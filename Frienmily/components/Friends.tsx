import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {REACT_APP_API_SERVER} from '@env';
import {useFocusEffect} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

export default function Friends() {
  // const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER

  const [friendItemList, setFriendItemList] = useState([]);

  const styles = StyleSheet.create({
    floatButtonFontSize: {
      fontSize: 50,
    },
    circleButton: {
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: '#907651',
      position: 'absolute',
      right: 30,
      bottom: 30,
      opacity: 0.8,
    },
  });
  const navigation = useNavigation();

  let fetchResult: any;

  const isFocused = useIsFocused();
  useEffect(() => {
    const loadFriendList = async () => {
      try {
        console.log('loadFriendList...');
        const response = await fetch(`${REACT_APP_API_SERVER}/friends/`);
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 25, paddingBottom: '1%'}}>Friends</Text>
      </View>
      <ScrollView style={{backgroundColor: 'white'}}>
        {friendItemList.map((item: any, idx: number) => (
          <FriendItem items={item} key={idx} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          navigation.navigate('Add friends' as never);
        }}>
        <Text style={styles.floatButtonFontSize}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
