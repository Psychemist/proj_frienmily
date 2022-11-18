import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RootState } from '../redux/store'
import { fetchLogin } from '../redux/user/thunk'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
    const usernameInRedux = useSelector((state: RootState) => state.user.username)


    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const errMsg = useSelector((state: RootState) => state.user.errMsg)

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    if (isLoggedIn == true) {
        console.log("isLoggedIn is true at LoginScreen")
    } else {
        console.log("isLoggedIn is false at LoginScreen")
    }

    // NOTE: Remember to add this line before using dispatch
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onLogin = async () => {
        try {
            let loginResult = await dispatch(fetchLogin({ username, password })).unwrap()

            // TODO: login成功時，isLoggedIn變為true; 以此作為 guard
            console.log('loginResult from unwrap = ', loginResult)
            setUsername("")
            setPassword("")

            navigation.navigate('HomeTab' as never)

        } catch (error) {
            console.log('error from unwrap = ', error)
            Alert.alert(
                `${errMsg}`,
                '',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            );
        }
    }

    const onGoogleLogin = () => {
        // TODO: 做 Google Login

        navigation.navigate('Groups' as never)
    }
    const onFacebookLogin = () => {
        // TODO: 做 FB Login
    }

    const onCreateAccount = () => {
        navigation.navigate('SignUp' as never)
    }



    const styles = StyleSheet.create({
        body: {
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            flex: 1,
        },
        logoWrapper: {
            // position: 'absolute',
            top: 80,
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
        loginBtn: {
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
        <SafeAreaView style={styles.body}>
            <View style={styles.logoWrapper}>
                <Text>LOGO here</Text>
            </View>

            <View style={{
                position: 'absolute',
                marginTop: 350
            }}>

                <View style={styles.inputFieldWrapper}>
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

                <TouchableOpacity onPress={onLogin} style={[styles.loginBtn, { marginBottom: 30 }]}>
                    <Text style={{
                        color: 'white',
                        fontSize: 20
                    }} >Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onGoogleLogin} style={[styles.loginBtn, { backgroundColor: '#d1463b' }]}>
                    <Text style={{
                        fontSize: 20
                    }}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onFacebookLogin} style={[styles.loginBtn, { backgroundColor: '#32519c' }]}>
                    <Text style={{
                        fontSize: 20
                    }}>Continue with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onCreateAccount} style={styles.loginBtn}>
                    <Text style={{
                        fontSize: 20
                    }}>Create a New Account</Text>
                </TouchableOpacity>



            </View>
        </ SafeAreaView>


    )
}
// function useSelector(arg0: (state: RootState) => any) {
//     throw new Error('Function not implemented.')
// }

