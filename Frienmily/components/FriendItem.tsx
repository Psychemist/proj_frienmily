import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
interface FriendItemProps {
  items: any;
  key: number;
}

export default function FriendItem(props: FriendItemProps) {
  const navigation = useNavigation();
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
  });

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={30} />
      <View>
        <Text style={styles.text}>{props.items.username}</Text>
      </View>
      <View>
        <Text style={styles.text}>owns you HKD $200.00</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('Groceries' as never)}>
        {/* Dummy nav to Groceries first, going to change navigation to 'Group Detail' - Ronson 13Nov2022 17:48 */}
        <FontAwesome name="angle-right" size={30} />
      </Pressable>

      {/* // for icon testings */}
      {/* <FontAwesome name='times' />
            <FontAwesome5 name='times' />
            <FontAwesome5Pro name='times' /> */}
    </View>
  );
}
