import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Icon, Input } from 'react-native-elements'

export default function CreateGroup() {

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });

    const [number, onChange] = useState(null);
    const onChangeText = (text: string) => {
        console.log(text)
    }

    return (
        <SafeAreaView>
            <Text>This is add CreateGroup page</Text>
            <TextInput 
                style={styles.input}
                placeholder="Group Name"/>
        </SafeAreaView>

    )
}