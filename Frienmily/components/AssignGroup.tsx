import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Icon from "react-native-vector-icons/Ionicons";


export default function AssignGroup() {

  const styles = StyleSheet.create({
    addMoreText: {
      fontSize: 15,
      padding: 5,
      color: '#384db7',
    },

    totalText: {
      fontSize: 15,
      textAlign: 'right',
      padding: 20,
    },

    buttonText: {
      fontSize: 20,
      fontWeight: '300',
      color: 'white',
    },

    assignGroupButton: {
      backgroundColor: '#47b4b1',
      height: 40,
      width: 400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
    },
    header: {
      height: "14%",
      alignItems: "center",
      marginBottom: "10%",
      width: "100%"
    },
    text: {
      borderRadius: 10,
      fontSize: 30,
      fontWeight: "bold",
    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingLeft: '20%',
      fontSize: 25,
    },
    progressBar: {
      position: "absolute",
      marginTop: 130

    },
    line1: {
      height: 5,
      width: 68
    },
    line2: {
      height: 5,
      width: 132
    },
    line3: {
      height: 5,
      width: 132
    },
    line4: {
      height: 5,
      width: 68
    },
    circleWrapper: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      width: 40,
      borderRadius: 20,
      position: "absolute",

    },
    circleFilled: {
      backgroundColor: "#47b4b1",
    },
    circleUnfilled: {
      backgroundColor: "white",
      borderWidth: 6,
      borderStyle: "solid",
      borderColor: "#e1e0e1",
    },
    caption: {
      position: "absolute",
      fontWeight: "bold",
      color: "#939493",
      top: 21.5
    },
    scrollWrapper: {
      width: "98%",
      height: 500,
      paddingHorizontal: 5
    },
    groupsWrapper: {
      marginTop: 0,
      alignItems: "center",
      width: "100%",
      height: 500,
      padding: 10,
      backgroundColor: "blue"
    },
    itemContainer: {
      width: "100%",
      height: 100,
      backgroundColor: "white",
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.32,
      shadowRadius: 4,
      elevation: 9,
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: 15,
      marginTop: 5,
      marginBottom: 5,
    },
    groupImage: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: "grey",
      marginRight: 20
    },
    groupName: {
      fontSize: 20,
      color:"gray",
      fontWeight:"300"
    }
  });

  const navigation = useNavigation();
  let groupNumber: number
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const isFocused = useIsFocused();
  const [groupItemList, setGroupItemList] = useState([]);
  useEffect(() => {
    const loadGroupList = async () => {
      try {
        console.log('loadGroupList...');
        const response = await fetch(
          `${REACT_APP_API_SERVER}/groups/getGroups/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userID: userIdInRedux,
            }),
          },
        );

        let json = [];
        if (response) {
          json = await response.json();
        }
        // console.log(json);
        setGroupItemList(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    if (isFocused) {
      loadGroupList();
    }
  }, [isFocused]);

  let isSelectGroupFamilyGroup: boolean

  const selectedGroup = async (group_id: number) => {
    console.log("groupItemList :", groupItemList)
    console.log("userIdInRedux :", userIdInRedux);
    console.log("groupId :", group_id);
    groupNumber = group_id

    for (let item of groupItemList) {
      if (item["group_id"] == group_id) {
        isSelectGroupFamilyGroup = item["is_family_group"]
      }
    }


    // assign items to group
    await fetch(`${REACT_APP_API_SERVER}/goods/assignToGroup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userIdInRedux,
        groupId: group_id
      }),
    });
    showAlert()

    // navigation.navigate('ShoppingList' as never, { groupId: group_id } as never)
  }

  const showAlert = () => {
    Alert.alert('Cart items assigned!', '', [
      {
        text: 'OK', onPress: () => navigation.navigate('ShoppingList' as never, { groupId: groupNumber, isFamilyGroup: isSelectGroupFamilyGroup } as never)
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative", backgroundColor:"white" }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Cart' as never)}>
          <FontAwesome name='angle-left' size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Assign a Group</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={[styles.line1, { backgroundColor: '#47b4b1' }]}></View>
          <View style={[styles.line2, { backgroundColor: '#47b4b1' }]}></View>
          <View style={[styles.line3, { backgroundColor: '#47b4b1' }]}></View>
          <View style={[styles.line4, { backgroundColor: '#e1e0e1' }]}></View>
        </View>
        <View style={styles.circleWrapper}>
          <View style={[styles.circle, styles.circleFilled, { left: 50, top: -21.5 }]}>
            <Text style={{ fontWeight: "bold", color: "white" }}>1</Text>
          </View>
          <View style={[styles.circle, styles.circleFilled, { left: "45%", top: -21.5 }]}>
            <Text style={{ fontWeight: "bold", color: "white" }}>2</Text>
          </View>
          <View style={[styles.circle, styles.circleUnfilled, { right: 50, top: -21.5, borderColor: '#47b4b1' }]}>
            <Text style={{ fontWeight: "bold", color: "#939493" }}>3</Text>
          </View>
          <Text style={[styles.caption, { left: 50 }]}>Menu</Text>
          <Text style={[styles.caption, { left: "46%" }]}>Cart</Text>
          <Text style={[styles.caption, { right: 25 }]}>Assign Group</Text>
        </View>


      </View>

      <ScrollView style={styles.scrollWrapper}>
        {groupItemList.map((item: any, idx: number) => (
          <TouchableOpacity style={styles.itemContainer} key={idx} onPress={() => {
            selectedGroup(item.group_id)
          }}>
            <View><Image style={styles.groupImage} source={{ uri: item.profile_picture }} ></Image></View>
            <Text style={styles.groupName}>{item.group_name}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  )
}
