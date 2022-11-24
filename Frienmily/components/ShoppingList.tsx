import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShoppingListItem from './ShoppingListItem';
import { REACT_APP_API_SERVER } from '@env';

export default function ShoppingList() {
  const route = useRoute<any>()
  let groupId = route.params.groupId || ''

  const isFocused = useIsFocused();
  const [groupName, setGroupName] = useState();
  useEffect(() => {
    const loadFriendList = async () => {
      try {
        console.log('get group name');
        console.log("groupID :", groupId);

        const response = await fetch(`${REACT_APP_API_SERVER}/groups/getGroupName/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupID: groupId,
          }),
        });
        let groupName;
        if (response) {
          groupName = await response.json();
        }
        console.log("groupName :", groupName);
        setGroupName(groupName);
      } catch (error) {
        console.log('error', error);
      }
    };
    if (isFocused) {
      loadFriendList();
    }
  }, [isFocused]);



  const styles = StyleSheet.create({
    addMoreText: {
      fontSize: 15,
      padding: 5,
      color: '#47b4b1',
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

    receiptBtn: {
      backgroundColor: '#47b4b1',
      height: 40,
      width: "45%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
    },
    membersBtn: {
      backgroundColor: '#47b4b1',
      height: 40,
      width: "95%",
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
    groupNameWrapper: {
      position: "absolute",
      top: 120,
      padding: '1%'
    },
    scrollWrapper: {
      // position: "absolute",
      // top: 140,
      width: "98%",
      height: 500,
      padding: 5
    },
  });
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative" }}>
      {/* <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 25, paddingBottom: "1%"}}>Shopping List</Text> 
            </View> */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeTab' as never)}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Shopping List</Text>
      </View>

      <View style={styles.groupNameWrapper}>
        <Text style={{ fontSize: 20 }}>{groupName}</Text>
      </View>
      <ScrollView style={styles.scrollWrapper}>
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
      </ScrollView>
      <View style={{ width: "100%" }}>
        <View>
          <TouchableOpacity
            style={styles.addMoreText}
            onPress={() => {
              navigation.navigate('Groceries' as never);
            }}>
            <Text style={styles.addMoreText}>+ Add more items</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.totalText}>Estimate Total: HKD$ 800</Text>
        </View>
      </View>


      <View style={{
        // alignItems: 'center',
        // justifyContent: 'space-around',
        flexDirection: "row",
        width: "90%",
      }}>
        <TouchableOpacity
          style={styles.receiptBtn}
          onPress={() => {
            navigation.navigate(
              'UploadReceipt' as never,
              { groupId: groupId } as never,
            );
          }}>
          <Text style={styles.buttonText}>Upload Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.receiptBtn}
          onPress={() => {
            navigation.navigate('ReceiptRecord' as never, { groupId: groupId, groupName: groupName } as never);
          }}>
          <Text style={styles.buttonText}>Receipt Record</Text>
        </TouchableOpacity>
      </View>


      <View style={{
        // alignItems: 'center',
        // justifyContent: 'space-around',
        flexDirection: "row",
        width: "90%",
      }}>
        <TouchableOpacity
          style={styles.membersBtn}
          onPress={() => {
            navigation.navigate('GroupMember' as never, { groupId: groupId, groupName: groupName } as never)
          }}>
          <Text style={styles.buttonText}>Group Members</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
