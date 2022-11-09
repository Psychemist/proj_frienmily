import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RootState } from '../redux/store'
import { fetchLogin } from '../redux/user/thunk'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {



    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");


    // NOTE: Remember to add this line before using dispatch
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onLogin = () => {
        dispatch(fetchLogin({ username, password }))

    }

    const onGoogleSignUp = () => {

    }
    const onFacebookSignUp = () => {

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
            left: 10,
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
        <View style={styles.body}>
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

                <TouchableOpacity style={[styles.loginBtn, { marginBottom: 30 }]}>
                    <Text style={{
                        color: 'white',
                        fontSize: 20
                    }} onPress={onLogin}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onGoogleSignUp} style={[styles.loginBtn, { backgroundColor: '#32519c' }]}>
                    <Text style={{
                        fontSize: 20
                    }}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onFacebookSignUp} style={[styles.loginBtn, { backgroundColor: '#d1463b' }]}>
                    <Text style={{
                        fontSize: 20
                    }}>Continue with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: '#47b4b1',
                    height: 40,
                    width: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10
                }}>
                    <Text style={{
                        fontSize: 20
                    }} onPress={onLogin}>Create a New Account</Text>
                </TouchableOpacity>



            </View>
        </View >


    )
}
function useSelector(arg0: (state: RootState) => any) {
    throw new Error('Function not implemented.')
}

