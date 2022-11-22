import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CartItem from './CartItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function Cart() {
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
      width: 360,
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
      fontSize: 25,
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
      backgroundColor: "#f79f24",
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
    }

  });
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative" }}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeTab' as never)}>
          <FontAwesome name='angle-left' size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Cart</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={[styles.line1, { backgroundColor: '#47b4b1' }]}></View>
          <View style={[styles.line2, { backgroundColor: '#47b4b1' }]}></View>
          <View style={[styles.line3, { backgroundColor: '#e1e0e1' }]}></View>
          <View style={[styles.line4, { backgroundColor: '#e1e0e1' }]}></View>
        </View>
        <View style={styles.circleWrapper}>
          <View style={[styles.circle, styles.circleFilled, { left: 50, top: -21.5 }]}>
            <Text style={{ fontWeight: "bold", color: "white" }}>1</Text>
          </View>
          <View style={[styles.circle, styles.circleUnfilled, { left: "45%", top: -21.5 }]}>
            <Text style={{ fontWeight: "bold", color: "#939493" }}>2</Text>
          </View>
          <View style={[styles.circle, styles.circleUnfilled, { right: 50, top: -21.5 }]}>
            <Text style={{ fontWeight: "bold", color: "#939493" }}>3</Text>
          </View>
          <Text style={[styles.caption, { left: 50 }]}>Menu</Text>
          <Text style={[styles.caption, { left: "46%" }]}>Cart</Text>
          <Text style={[styles.caption, { right: 25 }]}>Assign Group</Text>
        </View>
      </View>



      <ScrollView style={{ backgroundColor: 'white' }}>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
        <Text>
          <CartItem />
        </Text>
      </ScrollView>
      <View style={{ width: "100%" }}>
        <View>
          <TouchableOpacity
            style={styles.addMoreText}
            onPress={() => {
              // navigation.navigate('Groceries' as never);
              navigation.navigate('HomeTab' as never);
            }}>
            <Text style={styles.addMoreText}>+ Add more items</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.totalText}>Estimated Total: HKD$ 800</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.assignGroupButton}
          onPress={() => {
            navigation.navigate('AssignGroup' as never);
          }}>
          <Text style={styles.buttonText}>Assign Group</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

