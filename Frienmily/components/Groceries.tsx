import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import FriendItem from './FriendItem';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GroceriesCategories from './GroceriesCategories';
import GroceriesRandomItems from './GroceriesRandomItems';
import GroceriesTopItems from './GroceriesTopItems';
import { REACT_APP_API_SERVER } from '@env';
import { useQuery } from "react-query";

export default function Groceries() {
  const [isBestSeller, setIsBestSeller] = useState(true)


  const bestSellerButton = () => {
    if (isBestSeller == false) {
      setIsBestSeller(!isBestSeller)
    }

    // console.log(isBestSeller);

  };
  const exploreButton = () => {
    if (isBestSeller != false) {
      setIsBestSeller(!isBestSeller)
    }

    // console.log(isBestSeller);

  };

  const allCatFetch = () => {
    console.log("allCatFetch");
  }
  const someCatFetch = (array: any) => {
    // console.log(`someCatFetch: ${array}`)
    console.log(array);

  }



  const navigation = useNavigation();
  // const [data, setData] = React.useState([]);
  const [groupName, setGroupName] = React.useState('');
  // const [FilterData, setFilterData] = React.useState([]);
  const styles = StyleSheet.create({
    text: {
      fontSize: 25,
      fontWeight: 'bold',
      paddingLeft: 20,
    },
    cartQty: {
      justifyContent: "center",
      alignItems: "center",
      height: 20,
      width: 20,
      borderRadius: 100,
      backgroundColor: "#f79f24",
      position: "absolute",
      top: -10,
      right: -10
    },
    container: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      padding: 20,
      paddingTop: 2,
      paddingBottom: 2,
      backgroundColor: '#47b4b1',
      //SHADOW
      // shadowOpacity: 0.1,
      // shadowRadius: 2,
      // shadowOffset: {
      //     height: 1,
      //     width: 1
      // }
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      minWidth: 300,
      maxWidth: 300,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    searchButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: 'white',
      width: 120,
      height: 45,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },

    catergoriesContainer: {
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // flexDirection: 'row',
      // width: '100%',
      // paddingBottom: 5,
      backgroundColor: 'white',
    },

    topItemsContainer: {
      display: 'flex',
      // justifyContent: 'space-around',
      alignItems: 'flex-start',
      flexDirection: 'row',
      width: '100%',
      // padding: 10,
    },

    randomItemsContainer: {
      display: 'flex',

      justifyContent: 'space-around',
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '100%',
      // padding: 5,
    },

    topItemsCards: {
      display: 'flex',
      // justifyContent: "space-around",
      // alignItems: "flex-start",
      flexDirection: "row",
      width: "100%",
      // padding: 5,

    },
    bestSellerButton: {
      // margin: 5,
      fontSize: 20,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      // borderRadius: 10,
      // borderWidth: 1,
      // borderColor: isBestSeller ? '#47b4b1' : 'white',
      // borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
    },
    exploreButton

      : {
      // margin: 5,
      fontSize: 20,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      // borderRadius: 10,
      // borderWidth: 1,
      // borderColor: isBestSeller ? 'white' : '#47b4b1',
      // borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
    },

    bestSellerButtonText: {
      fontSize: isBestSeller ? 15 : 12,
    },
    exploreButtonText: {
      fontSize: isBestSeller ? 15 : 18,
    },
    groupTypeButtonContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
      backgroundColor: 'white'
    },
  });
  // useEffect(() => {
  //     navigation.setOptions({
  //         headerLargerTitle: true,
  //         headerTitle: "Groceries",
  //         headerSearchBarOptions: {
  //             placeholder: "Search Groceries",
  //             onChangeText: (event: { nativeEvent: { text: any; }; }) => {
  //                 searchFilterFunction(event.nativeEvent.text);
  //             },
  //         }
  //     });
  // }, [navigation]);

  // const searchFilterFunction = (text: string) => {
  //     if(text){
  //         const newData = data.filter(item => {
  //             const itemData = item.name.first? item.name.first.toUpperCase() : ''.toUpperCase();
  //             const textData = text.toUpperCase();
  //             return itemData.indexOf(textData) > -1;
  //         })
  //         setFilterData(newData);
  //     } else {
  //         setFilterData(data);
  //     }
  // }
  const fetchGoodsList = async () => {
    const response = await fetch(`${REACT_APP_API_SERVER}/goods/categories`);
    // console.log("response :", response);

    return response.json();
  };

  const { data: fetchGoodListData, status: fetchGoodListStatus } = useQuery("users", fetchGoodsList);
  // console.log("fetchGoodsList :", fetchGoodListData);
  // console.log("HELLOOOO");





  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#47b4b1' }}>
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Search Products"
            value={groupName}
            onChangeText={setGroupName}
            style={styles.input}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={{ position: "relative" }}>
            <FontAwesome name="shopping-cart" size={30} />
            <View style={styles.cartQty}>
              <Text>0</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>


      {/* Categories Column */}
      <View style={styles.catergoriesContainer}>
        {/* <ScrollView horizontal={true} style={{backgroundColor: 'white'}}> */}
        <Text>
          <GroceriesCategories allCatFetch={allCatFetch} someCatFetch={someCatFetch} />
        </Text>
        {/* </ScrollView> */}
      </View>

      <View style={styles.groupTypeButtonContainer}>
        <TouchableOpacity
          style={styles.bestSellerButton}
          onPress={bestSellerButton}>
          <Text style={styles.bestSellerButtonText}>Best Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.exploreButton

          }
          onPress={exploreButton}>
          <Text style={styles.exploreButtonText}>Explore</Text>
        </TouchableOpacity>
      </View>

      {/* Top 5 Column */}

      {isBestSeller == true &&
        <View style={{ backgroundColor: 'white' }}>
          <View >
            <Text style={styles.text}>Best Seller</Text>
          </View>

          <ScrollView horizontal={true} style={{ backgroundColor: 'white', width: '100%' }}>
            <View style={styles.topItemsContainer}>
              {/* <View style={styles.topItemsCards}> */}

              {/* <TouchableOpacity>
                <Text> */}
              {fetchGoodListStatus === 'success' && <GroceriesTopItems items={fetchGoodListData.data.top5} status={fetchGoodListStatus} />}
              {/* </Text>
              </TouchableOpacity> */}
              {/* </View> */}
            </View>
          </ScrollView>
          {/* ======================= test start ======================= */}
          <TouchableOpacity style={{
            height: 50,
            width: 80,
            backgroundColor: "grey",
            justifyContent: "center",
            alignItems: "center"
          }} onPress={() => navigation.navigate('GroceriesDetails' as never)} >
            <Text>Temp Item by Mike</Text>
          </TouchableOpacity>


          {/* ======================= test end ======================= */}
          <View style={{ minHeight: 500 }}></View>
        </View>}



      {/* Random Goods Column */}
      {isBestSeller == false &&

        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={styles.randomItemsContainer}>
            <View><Text style={styles.text}>Explore</Text>
            </View>
            <View style={styles.topItemsCards}>

              <Text>
                {fetchGoodListStatus === 'success' && <GroceriesRandomItems items={fetchGoodListData.data.random} status={fetchGoodListStatus} />}
              </Text>

            </View>
          </View>
        </ScrollView>}

    </SafeAreaView>
  );
}
