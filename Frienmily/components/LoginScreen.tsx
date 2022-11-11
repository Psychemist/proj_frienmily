import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
        navigation.navigate('HomeTab' as never)
    }

    const onGoogleLogin = () => {



        navigation.navigate('Groups' as never)
    }
    const onFacebookLogin = () => {

    }

    const onSignUp = () => {
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

                <TouchableOpacity onPress={onGoogleLogin} style={[styles.loginBtn, { backgroundColor: '#32519c' }]}>
                    <Text style={{
                        fontSize: 20
                    }}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onFacebookLogin} style={[styles.loginBtn, { backgroundColor: '#d1463b' }]}>
                    <Text style={{
                        fontSize: 20
                    }}>Continue with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onSignUp} style={styles.loginBtn}>
                    <Text style={{
                        fontSize: 20
                    }}>Create a New Account</Text>
                </TouchableOpacity>



            </View>
        </ SafeAreaView>


    )
}
function useSelector(arg0: (state: RootState) => any) {
    throw new Error('Function not implemented.')
}

