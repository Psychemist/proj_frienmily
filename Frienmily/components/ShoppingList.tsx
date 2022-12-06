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
  const [isArchivedList, setIsArchivedList] = useState(false)

  let boughtItems: any[] = []
  let unboughtItems: any[] = []

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

        console.log("############################## reloadAgain is triggered")


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

      console.log(getLowest().price * item.quantity)
      total += getLowest().price * item.quantity
    }
    setEstimatedTotal(total)
  }

  const showToByList = () => {
    if (isArchivedList == true) {
      setIsArchivedList(!isArchivedList)
    }
  }

  const showArchivedList = () => {
    if (isArchivedList == false) {
      setIsArchivedList(!isArchivedList)
    }
  }

  const mergeFromOtherGroups = () => {
    navigation.navigate('MergeGroupList' as never, { currentGroupId: groupId } as never)

  }

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> allAssignedItems: ", allAssignedItems)
  boughtItems = allAssignedItems.filter((item) => {
    return (item["is_completed"] == true)
  })
  unboughtItems = allAssignedItems.filter((item) => {
    return (item["is_completed"] == false)
  })
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> boughtItems: ", boughtItems)
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> unboughtItems: ", unboughtItems)

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
      // height: "30%",
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
      // height: "30%",
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
      backgroundColor: "white",
      position: "relative"

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
      paddingRight: "10%",

      // right: 10,
      // bottom: 7,
      // height: 50,
      width: "100%",
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
      fontSize: 20,
      textAlign: "center",
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
      top: "5%",
      padding: '1%',
      flexDirection: "row",
      // marginBottom: 100,
    },
    listTypeButtonContainer: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      width: '100%',
      paddingTop: "2%",
      // paddingBottom: 10,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    toBuyListButton: {
      // margin: 5,
      // fontSize: 50,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      shadowOpacity: 1,
      shadowColor: isArchivedList ? "lightgray" : "#47b4b1",
      shadowRadius: 1,
      shadowOffset: {
        height: isArchivedList ? -4 : -4,
        width: isArchivedList ? 4 : 4
      },
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      margin: 2
    },
    archiveListButton

      : {
      // margin: 5,
      // fontSize: 100,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      shadowOpacity: 1,
      shadowColor: isArchivedList ? "#47b4b1" : "lightgray",
      shadowRadius: 1,
      shadowOffset: {
        height: isArchivedList ? -4 : -4,
        width: isArchivedList ? 4 : 4
      },
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      margin: 2
    },

    listButtonText: {
      fontSize: isArchivedList ? 20 : 20,
      fontWeight: "bold",
      color: "#606467",
    },

    scrollWrapper: {
      // position: "absolute",
      // top: 10,
      width: "100%",
      height: 1000,
      paddingLeft: "1%",
      paddingRight: "1%",
    },
    userImage: {
      width: 58,
      height: 58,
      borderRadius: 50,
      borderColor: "#47b4b1",
      // right: 5,
      // marginRight: "5%",
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
    iconContainer: {
      position: 'absolute',
      bottom: 5,
      right: 2,
      backgroundColor: '#47b4b1',
      borderRadius: 20,
      zIndex: 1000,
      width: 17,
      height: 17,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mergeBtn: {
      borderColor: "#47b4b1",
      borderWidth: 2,
      height: 50,
      width: 380,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: "1%",
      marginbottom: 30,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
      paddingLeft: "2%",
      paddingRight: "2%",
      paddingBottom: "1%",
      backgroundColor: 'white',


    },
    mergeBtnText: {
      fontWeight: "300",
      color: "#606467",
      fontSize: 17,
      textAlign: "center",
    },

  });

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative", backgroundColor: "white" }}>
      <View style={{ height: "100%", alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeTab' as never)}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>
        <View style={styles.header}>

          <Text style={styles.text}>Shopping List</Text>
        </View>

        {isFamilyGroup ?
          <TouchableOpacity style={styles.reportBtnWrapper}
            onPress={loadGroupBuyingRecord}>
            <Text style={styles.reportButtonText}>Expense Analysis  </Text>
            <FontAwesome name='pie-chart' size={30} color={"#47b4b1"} />
          </TouchableOpacity>
          : <View></View>
        }

        <View style={styles.listTypeButtonContainer} >
          <TouchableOpacity
            style={styles.toBuyListButton}
            onPress={showToByList}>
            <Text style={styles.listButtonText}>To Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.archiveListButton}
            onPress={showArchivedList}>
            <Text style={styles.listButtonText}>Bought</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.groupNameWrapper}>
          <TouchableOpacity onPress={enlargeProfilePicture} style={{ position: 'relative' }}>
            <Image style={styles.userImage} source={{ uri: groupPic }} ></Image>
            {isFamilyGroup == true ? <View style={styles.iconContainer}><FontAwesome name="home" size={14} color={"white"} /></View> : null}

          </TouchableOpacity>
          <View style={{ justifyContent: 'center' }}><Text style={{ marginLeft: 20, fontSize: 23, fontWeight: "300" }}>{groupName}</Text></View>

        </View>

        <ScrollView style={styles.scrollWrapper}>
          {isArchivedList ?
            <View></View>
            :
            <TouchableOpacity
              style={styles.mergeBtn}
              onPress={mergeFromOtherGroups}>
              <Text style={styles.mergeBtnText}><FontAwesome name="code-fork" size={26} />  Merge Shopping List Items </Text>

            </TouchableOpacity>
          }
          {isArchivedList ?
            boughtItems.map((item: any) => (
              <ShoppingListItem items={item} key={item.cart_id} reloadPage={reloadPage} groupId={groupId} />
            ))
            :
            unboughtItems.map((item: any) => (
              <ShoppingListItem items={item} key={item.cart_id} reloadPage={reloadPage} groupId={groupId} />
            ))
          }
        </ScrollView>

        <View style={{ width: "100%" }}>
          <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{ alignItems: 'flex-end', marginTop: 15 }}
              onPress={() => {
                navigation.navigate('Groceries' as never);
              }}>
              <Text style={styles.addMoreText}>Back to Shopping</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.totalText}>Estimate Total: $ {addZeroes(estimatedTotal)}</Text>
          </View>
        </View>


        <View style={{
          flexDirection: "row",
          width: "90%",
          height: "8%"
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
          height: "10%"
        }}>
          <TouchableOpacity
            style={styles.membersBtn}
            onPress={() => {
              navigation.navigate('GroupMember' as never, { groupId: groupId, groupName: groupName } as never)
            }}>
            <Text style={styles.groupMemberButtonText}>Group Settings</Text>
          </TouchableOpacity>
        </View>
      </View>


    </SafeAreaView>
  );
}
