import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootState } from '../redux/store';
import { fetchLogin } from '../redux/user/thunk';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignUpScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  // NOTE: Remember to add this line before using dispatch
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onClickBackBtn = () => {
    navigation.navigate('Login' as never);
  };

  const onSignUp = async () => {
    try {
      const res = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          mobile: mobileNumber,
        }),
      });

      let result = await res.json();
      let resultMsg = result['message'];

      if (res.ok) {
        Alert.alert('Account created successfully!', '', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        navigation.navigate('Login' as never);
        setUsername('');
        setPassword('');
        setMobileNumber('');
      } else {
        Alert.alert(`${resultMsg}`, '', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const styles = StyleSheet.create({
    body: {
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      flex: 1,
    },
    backBtn: {
      position: 'absolute',
      top: 100,
      left: 20,
      height: 20,
      width: 45,
      backgroundColor: '#47b4b1',
    },
    logoWrapper: {
      top: 80,
      height: 200,
      width: 300,
      backgroundColor: '#47b4b1',
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
    signUpBtn: {
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
      marginTop: "32%",
      maxWidth: "100%"
    },
    backIcon: {
      textAlign: "left",
      color: "#47b4b1",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      },
      marginRight: "60%"

    }
  });

  return (
    <SafeAreaView style={styles.body}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <FontAwesome name='angle-left' size={35} style={styles.backIcon} />
      </TouchableOpacity>

      <View>
        <Text style={styles.appName}>Frienmily</Text>
      </View>

      <View
        style={{
          position: 'absolute',
          marginTop: 310,
        }}>
        <View style={[styles.inputFieldWrapper, { marginTop: 80 }]}>
          <TextInput
            autoCapitalize="none"
            placeholder="Username*"
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
            placeholder="Password*"
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

        {/* <View style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <View style={[styles.inputFieldWrapper, { width: 140 }]}>
            <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={{
              margin: 5,
              fontSize: 20
            }} />
          </View>
          <View style={[styles.inputFieldWrapper, { width: 140 }]}>
            <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={{
              margin: 5,
              fontSize: 20
            }} />
          </View>

        </View> */}

        <View style={styles.inputFieldWrapper}>
          <TextInput
            placeholder="Mobile Number*"
            value={mobileNumber}
            onChangeText={setMobileNumber}
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
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={{
              margin: 5,
              fontSize: 20,
              minWidth:"10%",
              maxWidth:"60%"
            }}
          />
        </View>

        <TouchableOpacity
          onPress={onSignUp}
          style={[styles.signUpBtn, { marginBottom: 30 }]}>
          <Text
            style={{
              fontSize: 20,
              color: "white"
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
function useSelector(arg0: (state: RootState) => any) {
  throw new Error('Function not implemented.');
}
