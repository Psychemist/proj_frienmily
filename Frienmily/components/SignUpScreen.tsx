import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RootState } from '../redux/store'
import { fetchLogin } from '../redux/user/thunk'
import { useNavigation } from '@react-navigation/native'

export default function SignUpScreen() {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");


  // NOTE: Remember to add this line before using dispatch
  const dispatch = useDispatch()
  const navigation = useNavigation()


  const onClickBackBtn = () => {

  }
  const onSignUp = () => {

  }



  const styles = StyleSheet.create({
    body: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      flex: 1,
    },
    backBtn: {
      position: "absolute",
      top: 100,
      left: 20,
      height: 20,
      width: 45,
      backgroundColor: '#47b4b1'
    },
    logoWrapper: {
      position: 'absolute',
      top: 150,
      height: 200,
      width: 300,
      backgroundColor: '#47b4b1'
    },
    inputFieldWrapper: {
      height: 40,
      width: 300,
      borderColor: '#47b4b1',
      borderWidth: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    signUpBtn: {
      backgroundColor: '#47b4b1',
      height: 40,
      width: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    }
  })

  return (
    <View style={styles.body}>

      <TouchableOpacity onPress={onClickBackBtn} style={styles.backBtn} >
        <Text style={{
          textAlign: 'center'
        }}> Back </Text>
      </TouchableOpacity>

      <View style={styles.logoWrapper}>
        <Text>LOGO here</Text>
      </View>

      <View style={{
        position: 'absolute',
        top: 330
      }}>
        <View style={[styles.inputFieldWrapper, { marginTop: 80 }]}>
          <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{
            margin: 5,
            fontSize: 20
          }} />

        </View>
        <View style={styles.inputFieldWrapper}>
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={{
            margin: 5,
            fontSize: 20
          }} />
        </View>

        <TouchableOpacity onPress={onSignUp} style={[styles.signUpBtn, { marginBottom: 30 }]}>
          <Text style={{
            fontSize: 20
          }} >Sign Up</Text>
        </TouchableOpacity>

      </View>

    </View >


  )
}
function useSelector(arg0: (state: RootState) => any) {
  throw new Error('Function not implemented.')
}

