import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootState} from '../redux/store';
import {fetchLogin} from '../redux/user/thunk';
import {useNavigation} from '@react-navigation/native';

export default function SignUpScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');

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
        headers: {'Content-Type': 'application/json'},
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
          {text: 'OK', onPress: () => console.log('OK Pressed')},
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
          {text: 'OK', onPress: () => console.log('OK Pressed')},
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
      height: 40,
      width: 300,
      borderColor: '#47b4b1',
      borderWidth: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    signUpBtn: {
      backgroundColor: '#47b4b1',
      height: 40,
      width: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
  });

  return (
    <SafeAreaView style={styles.body}>
      <TouchableOpacity onPress={onClickBackBtn} style={styles.backBtn}>
        <Text
          style={{
            textAlign: 'center',
          }}>
          {' '}
          Back{' '}
        </Text>
      </TouchableOpacity>

      <View style={styles.logoWrapper}>
        <Text>LOGO here</Text>
      </View>

      <View
        style={{
          position: 'absolute',
          marginTop: 330,
        }}>
        <View style={[styles.inputFieldWrapper, {marginTop: 80}]}>
          <TextInput
            autoCapitalize="none"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{
              margin: 5,
              fontSize: 20,
            }}
          />
        </View>

        <View style={styles.inputFieldWrapper}>
          <TextInput
            autoCapitalize="none"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={{
              margin: 5,
              fontSize: 20,
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
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            style={{
              margin: 5,
              fontSize: 20,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={onSignUp}
          style={[styles.signUpBtn, {marginBottom: 30}]}>
          <Text
            style={{
              fontSize: 20,
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
