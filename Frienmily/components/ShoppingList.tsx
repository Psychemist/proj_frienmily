import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
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
  const [groupPic, setGroupPic] = useState();
  const [allAssignedItems, setAllAssignedItems] = useState([]);
  const [estimatedTotal, setEstimatedTotal] = useState(0)


  useEffect(() => {
    const getGroupName = async () => {
      try {

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
        setGroupName(groupName.group_name);
        setGroupPic(groupName.profile_picture)
      } catch (error) {
        console.log('error', error);
      }
    };
    const getAssignedItems = async () => {
      try {

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
        console.log("@@@@@@@@@@@@@2 result:", result)
        setAllAssignedItems(result);
        let total = 0
        for (let item of result) {
          const getLowest = () => {
            let allPriceArray = [
              { price: +(item.wellcome_price) || 999, shop: "惠康" },
              { price: +(item.parknshop_price) || 999, shop: "百佳" },
              { price: +(item.jasons_price) || 999, shop: "Jasons" },
              { price: +(item.watsons_price) || 999, shop: "屈臣氏" },
              { price: +(item.mannings_price) || 999, shop: "萬寧" },
              { price: +(item.aeon_price) || 999, shop: "AEON" },
              { price: +(item.dch_price) || 999, shop: "大昌食品" },
              { price: +(item.ztore_price) || 999, shop: "士多" }
            ]
            let filtered = allPriceArray.filter(function (e) {
              return e.price;
            });
            const lowest = filtered.reduce<any>((previous, current) => {
              // console.log('checking', { previous, current })
              if (!Object.keys(previous).length) {
                return current
              }
              return current.price < previous.price ? current : previous;
            }, []);

            return lowest
          }
          // TODO: 計算 Money Saved （要找出 highest）

          console.log(getLowest().price * item.quantity)
          total += getLowest().price * item.quantity
        }
        setEstimatedTotal(total)
      } catch (error) {
        console.log('error', error);
      }
    };
    const reloadAgain = () => {
      try {

        setTimeout(async () => {
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
          setGroupName(groupName.group_name);
          setGroupPic(groupName.profile_picture)
        }, 1500)

      } catch (error) {
        console.log('error', error);
      }
    };

    if (isFocused) {
      getGroupName();
      getAssignedItems()
      reloadAgain()
    }
  }, [isFocused]);

  function addZeroes(num: number) {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const loadGroupBuyingRecord = async () => {
    try {
      navigation.navigate(
        'ExpenseReport' as never,
        { groupName: groupName, groupId: groupId } as never,
      );

    } catch (error) {
      console.log('error', error);
    }
  };

  const enlargeProfilePicture = () => {
    navigation.navigate('GroupPhotoEdit' as never, { groupPic: groupPic, group_id: groupId } as never)
  }

  const reloadPage = async () => {
    console.log("RELOAD")
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
    console.log("@@@@@@@@@@@@@3 result:", result)
    setAllAssignedItems(result);
    let total = 0
    for (let item of result) {
      const getLowest = () => {
        let allPriceArray = [
          { price: +(item.wellcome_price) || 999, shop: "惠康" },
          { price: +(item.parknshop_price) || 999, shop: "百佳" },
          { price: +(item.jasons_price) || 999, shop: "Jasons" },
          { price: +(item.watsons_price) || 999, shop: "屈臣氏" },
          { price: +(item.mannings_price) || 999, shop: "萬寧" },
          { price: +(item.aeon_price) || 999, shop: "AEON" },
          { price: +(item.dch_price) || 999, shop: "大昌食品" },
          { price: +(item.ztore_price) || 999, shop: "士多" }
        ]
        let filtered = allPriceArray.filter(function (e) {
          return e.price;
        });
        // console.log("filtered :", filtered)
        // let filtered2 = filtered.filter(function (e) {
        //   return e.price;
        // });
        const lowest = filtered.reduce<any>((previous, current) => {
          // console.log('checking', { previous, current })
          if (!Object.keys(previous).length) {
            return current
          }
          return current.price < previous.price ? current : previous;
        }, []);

        return lowest
      }
      // TODO: 計算 Money Saved （要找出 highest）

      console.log(getLowest().price * item.quantity)
      total += getLowest().price * item.quantity
    }
    setEstimatedTotal(total)
  }

  const styles = StyleSheet.create({
    addMoreText: {
      fontSize: 16,
      padding: 5,
      color: '#47b4b1',
      fontWeight: "300",
      marginRight: '7%'
    },

    totalText: {
      fontSize: 18,
      textAlign: 'right',
      padding: 10,
      fontWeight: "bold",
      color: "gray",
      marginRight: "5%"

    },

    buttonText: {
      fontSize: 18,
      // fontWeight: '300',
      color: 'white',
    },
    groupMemberButtonText: {
      fontSize: 20,
      // fontWeight: '300',
      color: 'white',
    },

    receiptBtn: {
      backgroundColor: '#47b4b1',
      height: 60,
      width: "45%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
    },
    membersBtn: {
      backgroundColor: '#47b4b1',
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
    header: {
      height: "12%",
      alignItems: "center",
      marginBottom: "2%",
      marginRight: "2%",
      width: "100%",
      backgroundColor: "white"
    },

    reportBtnWrapper: {
      // position: 'absolute',
      display: "flex",
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#F5F5F5',
      borderRadius: 15,
      borderWidth: 1,
      marginBottom: "3%",
      marginTop: "3%",
      // right: 10,
      // bottom: 7,
      // height: 50,
      width: "90%",
      height: 70,
      backgroundColor: 'white',
      shadowOpacity: 1,
      shadowColor: "#47b4b1",
      shadowRadius: 0.8,
      shadowOffset: {
        height: 4,
        width: 4
      },
      // margin: 2
    },

    reportButtonText: {
      fontWeight: "bold",
      color: "#606467",
      fontSize: 20
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
      top: 100,
      padding: '1%',
      flexDirection: "row",
      // marginBottom: 100,
    },
    scrollWrapper: {
      // position: "absolute",
      top: 10,
      width: "100%",
      height: 500,
      paddingLeft: 5,
      paddingRight: 5,
    },
    userImage: {
      width: 70,
      height: 70,
      borderRadius: 50,
      borderColor: "#47b4b1",
      // right: 5,
      marginRight: "5%",
      borderWidth: 4,
      postion: "absolute",
      // right: "-20%",
      // top: "-20%",
      shadowOpacity: 3,
      shadowColor: "lightgray",
      shadowRadius: 2,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
  });
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative", backgroundColor: "white" }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeTab' as never)}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Shopping List</Text>


      </View>
      {isFamilyGroup ?
        <TouchableOpacity style={styles.reportBtnWrapper}
          onPress={loadGroupBuyingRecord}>
          <Text style={styles.reportButtonText}>Spending Analysis </Text>
          <FontAwesome name='pie-chart' size={30} color={"#47b4b1"} />
        </TouchableOpacity>
        : <View></View>
      }
      <View style={styles.groupNameWrapper}>
        <TouchableOpacity onPress={enlargeProfilePicture}>
          <Image style={styles.userImage} source={{ uri: groupPic }} ></Image>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 23, fontWeight: "300" }}>{groupName}</Text></View>

      </View>
      <ScrollView style={styles.scrollWrapper}>
        {allAssignedItems.map((item: any) => (
          <ShoppingListItem items={item} key={item.id} reloadPage={reloadPage} />
        ))}
      </ScrollView>
      <View style={{ width: "100%" }}>
        <View>
          <TouchableOpacity
            style={{ alignItems: 'flex-end' }}
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
        flexDirection: "row",
        width: "90%",
      }}>
        <TouchableOpacity
          style={styles.membersBtn}
          onPress={() => {
            navigation.navigate('GroupMember' as never, { groupId: groupId, groupName: groupName } as never)
          }}>
          <Text style={styles.groupMemberButtonText}>Group Members</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
