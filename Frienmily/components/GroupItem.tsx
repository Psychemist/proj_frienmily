import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface GroupItemProps {
  items: any;
  key: number;
}

export default function GroupItem(props: GroupItemProps) {
  const styles = StyleSheet.create({
    groupImage: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: 'grey',
      marginRight: 20
    },
    groupName: {
      fontSize: 20
    },
    settle: {
      color: '#81848b',
      marginRight: 22
    },
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      height: 100,
      padding: 10,
      paddingTop: 32,
      paddingBottom: 32,
      // backgroundColor: '#E2D8CF',
      // //SHADOW
      // shadowOpacity: 0.8,
      // shadowRadius: 3,
      // shadowOffset: {
      //   height: 1,
      //   width: 1,
      // },
      borderBottomColor: 'grey',
      borderBottomWidth: 0.2,
    },
    miniWrapper: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center'
    },
    arrowIcon: {
      position: 'absolute',
      right: 0,
      top: -7
    }
  });

  const logPress = (pressType: string) => {
    console.log(pressType);
  };
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(
          'ShoppingList' as never,
          { groupId: props.items.group_id } as never,
        )
      }>
      {/* <FontAwesome name="users" size={30} /> */}
      <View style={styles.miniWrapper}>
        <Image style={styles.groupImage} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} ></Image>
        <View>
          <Text style={styles.groupName}>{props.items.group_name}</Text>
        </View>
      </View>

      <View style={styles.miniWrapper}>
        <View>
          <Text style={styles.settle}>settled up</Text>
        </View>
        {/* <Pressable onPress={()=> navigation.navigate('ShoppingList' as never)}>  */}
        {/* Dummy nav to Groceries first, going to change navigation to 'Group Detail' - Ronson 13Nov2022 17:48 */}
        <FontAwesome name="angle-right" size={30} color={"#81848b"} style={styles.arrowIcon} />
      </View>
      {/* </Pressable> */}
    </TouchableOpacity>
  );
}
