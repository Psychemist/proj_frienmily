import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_APP_API_SERVER } from '@env';
// import { json } from 'express';
interface SearchBarItemProps {
   item: any,
}



export default function SearchBarItem(props: SearchBarItemProps) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [showResult, setShowResult] = useState(<Text></Text>);
    const [json, setJson] = useState();
    const styles = StyleSheet.create({
        text: {
            fontSize: 16,
            marginRight: 20,
            color: '#81848b'
        },

    });

    // TODO: Show the user image of each friend

    return (
        <TouchableOpacity onPress={() => navigation.navigate('GroceriesDetails' as never, { info: props.item } as never)}>
            <View>
                <View><Text style={styles.text}>{props.item.name}</Text></View>
            </View>
        </TouchableOpacity>
        
    );
}
