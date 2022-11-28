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
  let isFamilyGroup = route.params.isFamilyGroup || ''

  const isFocused = useIsFocused();
  const [groupName, setGroupName] = useState();
  const [allAssignedItems, setAllAssignedItems] = useState([]);
  const [estimatedTotal, setEstimatedTotal] = useState(0)
  useEffect(() => {
    const getGroupName = async () => {
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
    const getAssignedItems = async () => {
      try {
        console.log('getAssignedItems');
        console.log("groupIdHERE :", groupId)

        const response = await fetch(`${REACT_APP_API_SERVER}/goods/getAssignedItems/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId: groupId,
          }),
        });
        let result;
        if (response) {
          result = await response.json();
        }
        setAllAssignedItems(result);
        let total = 0
        for (let item of result) {
          const getLowest = () => {
            let allPriceArray = [
              { price: parseFloat(item.wellcome_price), shop: "惠康" },
              { price: parseFloat(item.parknshop_price), shop: "百佳" },
              { price: parseFloat(item.jasons_price), shop: "Jasons" },
              { price: parseFloat(item.watsons_price), shop: "屈臣氏" },
              { price: parseFloat(item.mannings_price), shop: "萬寧" },
              { price: parseFloat(item.aeon_price), shop: "AEON" },
              { price: parseFloat(item.dch_price), shop: "大昌食品" },
              { price: parseFloat(item.ztore_price), shop: "士多" }
            ]
            let filtered = allPriceArray.filter(function (e) {
              return e.price != NaN;
            });
            const lowest = filtered.reduce((previous, current) => {
              return current.price < previous.price ? current : previous;
            });
            return lowest
          }
          console.log(getLowest().price * item.quantity)
          total += getLowest().price * item.quantity
        }
        setEstimatedTotal(total)
      } catch (error) {
        console.log('error', error);
      }
    };
    if (isFocused) {
      getGroupName();
      getAssignedItems()
    }
  }, [isFocused]);

  function addZeroes(num: number) {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const loadGroupBuyingRecord = async () => {
    try {
      console.log('loadExpenseReports...');
      const response = await fetch(
        `${REACT_APP_API_SERVER}/groups/groupBuyingRecord`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId: groupId,
            month: 11,
            year: 2022
          }),
        },
      );
      console.log("response from server: " + response)
      let expenseRecord = await response.json()
      console.log("Group buying record get from server: ", expenseRecord)



      navigation.navigate(
        'ExpenseReport' as never,
        { groupName: groupName, groupId: groupId, expenseRecord: expenseRecord } as never,
      );

    } catch (error) {
      console.log('error', error);
    }
  };

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
      position: 'relative',
      height: '14%',
      alignItems: 'center',
      // paddingTop: "1%",
      marginBottom: 0,
      width: '100%',
    },
    reportBtnWrapper: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderColor: '#47b4b1',
      borderRadius: 20,
      borderWidth: 2,
      right: 10,
      bottom: 7,
      height: 50,
      width: 80
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
      paddingLeft: 5,
      paddingRight: 5,
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
        {isFamilyGroup ?
          <TouchableOpacity style={styles.reportBtnWrapper}
            onPress={loadGroupBuyingRecord}>
            <Text>Expense Report</Text>
          </TouchableOpacity>
          : <View></View>
        }

      </View>

      <View style={styles.groupNameWrapper}>
        <Text style={{ fontSize: 20 }}>{groupName}</Text>
      </View>
      <ScrollView style={styles.scrollWrapper}>
        {allAssignedItems.map((item: any, idx: number) => (
          <ShoppingListItem items={item} key={idx} />
        ))}
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
          <Text style={styles.totalText}>Estimate Total: HKD$ {addZeroes(estimatedTotal)}</Text>
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
