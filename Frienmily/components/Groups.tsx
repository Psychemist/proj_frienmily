import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GroupItem from './GroupItem';
import {useIsFocused} from '@react-navigation/native';
import {REACT_APP_API_SERVER} from '@env';

export default function Groups() {
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

  const isFocused = useIsFocused();
  const [groupItemList, setGroupItemList] = useState([]);
  useEffect(() => {
    const loadGroupList = async () => {
      try {
        console.log('loadGroupList...');
        const response = await fetch(`${REACT_APP_API_SERVER}/groups/`);
        let json = [];
        if (response) {
          json = await response.json();
        }
        console.log(json);
        setGroupItemList(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    if (isFocused) {
      loadGroupList();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 25, paddingBottom: '1%'}}>Groups</Text>
      </View>
      <ScrollView style={{backgroundColor: 'white'}}>
        {groupItemList.map((item: any, idx: number) => (
          <GroupItem items={item} key={idx} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          navigation.navigate('Create Group' as never);
        }}>
        <Text style={styles.floatButtonFontSize}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
