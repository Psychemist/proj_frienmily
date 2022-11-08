import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
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



    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        }}>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{
                margin: 5
            }} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={{
                margin: 5
            }} />
            <TouchableOpacity >
                <Text style={{
                    margin: 5
                }} onPress={onLogin}>Login</Text>
            </TouchableOpacity>

        </View >


    )
}
function useSelector(arg0: (state: RootState) => any) {
    throw new Error('Function not implemented.')
}

