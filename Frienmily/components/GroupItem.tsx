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
      // backgroundColor: 'grey',
      marginRight: 10,
      borderColor: "#47b4b1",
      borderWidth: 3,
      postion: "absolute",
      // right: "-20%",
      // top: "-20%",
      shadowOpacity: 0.8,
      shadowColor: "#47b4b1",
      shadowRadius: 2,
      shadowOffset: {
        height: 10,
        width: 10,
      },

    },
    groupName: {
      fontSize: 20,
      paddingRight:"10%",
      fontWeight:"300",
      color:"gray",
      // paddingTop: "5%",
      // paddingBottom:"5%",
    },
    settle: {
      color: '#81848b',
      marginRight: 22
    },
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      margin: "1%",
      width: '98%',
      height: 120,
      padding: 20,
      paddingTop: "5%",
      paddingBottom:"5%",
      backgroundColor: 'white',
      //SHADOW
      borderRadius: 20,
      shadowOpacity: 0.1,
      shadowRadius: 1,
      shadowOffset: {
          height: 4,
          width: 2,
      },
      borderBottomColor: 'grey',
      borderBottomWidth: 0.2,
    },
    miniWrapper: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      // padding:5
    },
    arrowIcon: {

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
          {
            groupId: props.items.group_id,
            isFamilyGroup: props.items.is_family_group,
            groupName: props.items.group_name
          } as never,
        )
      }>
      {/* <FontAwesome name="users" size={30} /> */}
      <View style={styles.miniWrapper}>
        <Image style={styles.groupImage} source={{ uri: props.items.profile_picture }} ></Image>
        <View>
          <Text style={styles.groupName}>{props.items.group_name}</Text>
        </View>
      </View>

      <View style={styles.miniWrapper}>

        {/* <Pressable onPress={()=> navigation.navigate('ShoppingList' as never)}>  */}
        {/* Dummy nav to Groceries first, going to change navigation to 'Group Detail' - Ronson 13Nov2022 17:48 */}
        <FontAwesome name="angle-right" size={30} color={"#47b4b1"} style={styles.arrowIcon} />
      </View>
      {/* </Pressable> */}
    </TouchableOpacity>
  );
}
