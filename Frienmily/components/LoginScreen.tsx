import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootState } from '../redux/store';
import { fetchLogin } from '../redux/user/thunk';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const usernameInRedux = useSelector(
    (state: RootState) => state.user.username,
  );

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const errMsg = useSelector((state: RootState) => state.user.errMsg);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  if (isLoggedIn == true) {
    console.log('isLoggedIn is true at LoginScreen');
  } else {
    console.log('isLoggedIn is false at LoginScreen');
  }

  // NOTE: Remember to add this line before using dispatch
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogin = async () => {
    try {
      let loginResult = await dispatch(
        fetchLogin({ username, password }),
      ).unwrap();

      console.log('loginResult from unwrap = ', loginResult);
      setUsername('');
      setPassword('');

      navigation.navigate('HomeTab' as never);
    } catch (error) {
      console.log('error from unwrap = ', error);
      Alert.alert(`Please enter your username and password`, '', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };



  const onCreateAccount = () => {
    navigation.navigate('SignUp' as never);
  };

  const styles = StyleSheet.create({
    body: {
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      flex: 1,
    },
    logoWrapper: {
      // position: 'absolute',
      // top: "10%",
      // height: 200,
      // width: "100%",
      // backgroundColor: '#47b4b1',
    },
    inputFieldWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      // margin: 12,
      // marginTop: "10%",
      marginBottom: "5%",
      borderWidth: 2.5,
      // padding: 10,
      minWidth: "50%",
      maxWidth: "99%",
      borderRadius: 15,
      backgroundColor: 'white',
      borderColor: "white",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      }

    },
    loginBtn: {
      backgroundColor: '#47b4b1',
      height: 55,
      width: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
      borderRadius: 15,
      borderColor: "white",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      }
    },
    appName: {
      fontSize: 42,
      fontWeight: "bold",
      color: "#47b4b1",
      marginTop:"40%",
      maxWidth:"100%"
  },
  });

  return (
    <SafeAreaView style={styles.body}>
            <StatusBar barStyle="dark-content"/>
        <View> 
            <Text style={styles.appName}>Frienmily</Text>
        </View>

      <View
        style={{
          position: 'absolute',
          marginTop: "90%",
          maxWidth: "100%"
        }}>
        <View style={styles.inputFieldWrapper}>
          <TextInput
            autoCapitalize="none"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{
              margin: 5,
              fontSize: 20,
              minWidth:"20%",
              maxWidth:"60%"

            }}
          />
        </View>
        <View style={styles.inputFieldWrapper}>
          <TextInput
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={{
              margin: 5,
              fontSize: 20,
              minWidth:"20%",
              maxWidth:"60%"
            }}
          />
        </View>

        <TouchableOpacity
          onPress={onLogin}
          style={[styles.loginBtn, { marginBottom: "50%"}]}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            Login
          </Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={onCreateAccount} style={styles.loginBtn}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
            }}>
            Create a New Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
// function useSelector(arg0: (state: RootState) => any) {
//     throw new Error('Function not implemented.')
// }
