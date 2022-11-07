import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function LoginScreen() {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <TextInput placeholder="username" />
            <TextInput placeholder="password" />
            <TouchableOpacity>
                <Text>Login</Text>
            </TouchableOpacity>

        </View >
    )
}
