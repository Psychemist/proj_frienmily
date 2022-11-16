import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';

export default function Account() {
  // 在 Redux 取資料
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const usernameInRedux = useSelector(
    (state: RootState) => state.user.username,
  );
  const mobileInRedux = useSelector((state: RootState) => state.user.mobile);
  const emailInRedux = useSelector((state: RootState) => state.user.email);

  // 設定初始值
  const [userId, setUserId] = useState(userIdInRedux);
  const [username, setUsername] = useState(usernameInRedux);
  const [mobile, setMobile] = useState(mobileInRedux);
  const [email, setEmail] = useState(emailInRedux);

  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isMobileEditable, setIsMobileEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const changeUsername = () => {
    if (isNameEditable == true) {
    }
    setIsNameEditable(!isNameEditable);
    console.log('Can edit username now');
  };
  const changeMobile = () => {
    setIsMobileEditable(!isMobileEditable);
    console.log('Can edit mobile number now');
  };
  const changeEmail = () => {
    setIsEmailEditable(!isEmailEditable);
    console.log('Can edit email now');
  };
  const onLogout = () => {
    // TODO: isLoggedIn 變為false；將token無效化

    Alert.alert('Are you sure you want to log out?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => navigation.navigate('Login' as never)},
    ]);
  };

  const styles = StyleSheet.create({
    mainPage: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    title: {
      // height: 40,
      // margin: 12,
      padding: 10,
      // minWidth: 300,
      // maxWidth: 300,
      borderRadius: 10,
      fontSize: 30,
    },
    itemContainer: {
      width: '90%',
      height: '18%',
      backgroundColor: 'white',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: 15,
      marginTop: 5,
      marginBottom: 5,
    },
    leftContainer: {
      // height: "100%",
      maxWidth: '80%',
      justifyContent: 'space-around',
    },
    fieldHeader: {
      fontSize: 20,
      paddingLeft: 10,
      marginBottom: 10,
    },
    fieldContent: {},
    fieldContentText: {
      paddingLeft: 10,
      fontSize: 18,
      padding: 10,
      fontWeight: 'bold',
    },
    inputField: {
      boxSizing: 'border-box',
      backgroundColor: 'rgba(71, 180, 177, 0.3)',
      fontSize: 18,
      shadowColor: '#47b4b1',
      borderRadius: 10,
      minWidth: 270,
      maxWidth: 270,
      padding: 10,
    },
    editBtn: {
      fontSize: 27,
      color: '#47b4b1',
    },
  });
  return (
    <SafeAreaView style={styles.mainPage}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 25, paddingBottom: '1%'}}>Account</Text>
      </View>

      <Text style={styles.title}>Personal Details</Text>

      <View style={{alignItems: 'center'}}>
        <View style={styles.itemContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.fieldHeader}>Username</Text>
            {isNameEditable ? (
              <TextInput
                autoCapitalize="none"
                maxLength={18}
                style={styles.inputField}
                value={username}
                onChangeText={setUsername}
              />
            ) : (
              <View>
                <Text style={styles.fieldContentText}>{username}</Text>
              </View>
            )}
          </View>
          <View>
            <Text>
              {isNameEditable ? (
                <FontAwesome
                  name="check"
                  size={40}
                  onPress={changeUsername}
                  style={styles.editBtn}
                />
              ) : (
                <FontAwesome
                  name="pencil"
                  size={40}
                  onPress={changeUsername}
                  style={styles.editBtn}
                />
              )}
            </Text>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.fieldHeader}>Mobile (for adding friends)</Text>
            {isMobileEditable ? (
              <TextInput
                keyboardType="numeric"
                maxLength={8}
                style={styles.inputField}
                value={mobile}
                onChangeText={setMobile}
              />
            ) : (
              <View>
                <Text style={styles.fieldContentText}>{mobile}</Text>
              </View>
            )}
          </View>
          <View>
            <Text>
              {isMobileEditable ? (
                <FontAwesome
                  name="check"
                  size={40}
                  onPress={changeMobile}
                  style={styles.editBtn}
                />
              ) : (
                <FontAwesome
                  name="pencil"
                  size={40}
                  onPress={changeMobile}
                  style={styles.editBtn}
                />
              )}
            </Text>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.fieldHeader}>Email Address</Text>
            {isEmailEditable ? (
              <TextInput
                autoCapitalize="none"
                maxLength={22}
                style={styles.inputField}
                value={email}
                onChangeText={setEmail}
              />
            ) : email ? (
              <Text style={styles.fieldContentText}>
                {email}
                {userId}hihi
              </Text>
            ) : (
              <View>
                <Text style={styles.fieldContentText}>
                  Update your email address so that your friend can find you!
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text>
              {isEmailEditable ? (
                <FontAwesome
                  name="check"
                  size={40}
                  onPress={changeEmail}
                  style={styles.editBtn}
                />
              ) : (
                <FontAwesome
                  name="pencil"
                  size={40}
                  onPress={changeEmail}
                  style={styles.editBtn}
                />
              )}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.itemContainer} onPress={onLogout}>
          <Text
            style={[
              styles.fieldHeader,
              {fontWeight: 'bold', fontSize: 18, paddingLeft: 10},
            ]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
