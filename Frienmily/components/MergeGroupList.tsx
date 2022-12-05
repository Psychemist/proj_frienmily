import { REACT_APP_API_SERVER } from '@env'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import MergeShoppingListItem from './MergeGroupListItem'

export default function MergeGroupList() {
  const navigation = useNavigation()
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);


  const isFocused = useIsFocused();
  const [groupItemList, setGroupItemList] = useState([]);
  useEffect(() => {
    console.log('GGGGG'.repeat(100))
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
          console.log("Group list details get from server: ", json)
        }

        setGroupItemList(json);

      } catch (error) {
        console.log('error', error);
      }
    };
    if (isFocused) {
      loadGroupList();
    }
  }, [isFocused]);


  console.log("groupItemList: ", groupItemList)



  const styles = StyleSheet.create({
    header: {
      height: '30%',
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
      borderRadius: 10,
      fontSize: 30,
      fontWeight: "bold",
    },
  })

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>
        <Text style={styles.text}>Merge from...</Text>
      </View>


      <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
        {groupItemList.map((item: any, idx: number) => (
          <MergeShoppingListItem items={item} key={idx} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
