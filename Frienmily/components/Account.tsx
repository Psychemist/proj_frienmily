import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export default function Account() {
    const [name, setName] = useState("defaultName")
    const [isChangeName, setIsChangeName] = useState(false)
    const [mobile, setMobile] = useState("12345678")
    const [isChangeMobile, setIsChangeMobile] = useState(false)
    const [email, setEmail] = useState("frienmily@gmail.com")
    const [isChangeEmail, setIsChangeEmail] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const changeName = () => {
        setIsChangeName(!isChangeName)
        console.log("changeName")
    }
    const changeMobile = () => {
        setIsChangeMobile(!isChangeMobile)
        console.log("changeMobile")
    }
    const changeEmail = () => {
        setIsChangeEmail(!isChangeEmail)
        console.log("changeEmail")
    }
    const onLogout = () => {
        // TODO: isLoggedIn 變為false；將token無效化


        Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => navigation.navigate('Login' as never) },
            ]
        );
    }

    const styles = StyleSheet.create({
        mainPage: {
            flex: 1
        },
        title: {
            // height: 40,
            // margin: 12,
            padding: 10,
            // minWidth: 300,
            // maxWidth: 300,
            borderRadius: 10,
            fontSize: 30
        },
        itemContainer: {
            width: "90%",
            backgroundColor: "#907651",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: "row",
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,
            height: "22%",
            alignItems: "center",
            // justifyContent: "space-between",
            // alignItems:"space-around",

        },
        leftContainer: {
            height: "100%",
            justifyContent: "space-around",
        },
        fontSize: {
            fontSize: 18,

        }
    });
    return (
        <SafeAreaView style={styles.mainPage}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 25, paddingBottom: "1%" }}>Account</Text>
            </View>

            <Text style={styles.title}>Personal Details</Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.fontSize, { fontWeight: "bold", fontSize: 22, paddingLeft: 10 }]}>Name</Text>
                        {isChangeName ? <TextInput autoCapitalize='none' maxLength={18} placeholder="New name" value={name} onChangeText={setName} style={[styles.fontSize, { backgroundColor: "white", borderRadius: 10, minWidth: 270, maxWidth: 270, padding: 10 }]} /> : <Text style={[styles.fontSize, { padding: 10 }]}>{name}</Text>}
                    </View>
                    <View>
                        <Text>{isChangeName ? <FontAwesome name='check' size={40} onPress={changeName} /> : <FontAwesome name='pencil' size={40} onPress={changeName} />}</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.fontSize, { fontWeight: "bold", fontSize: 18, paddingLeft: 10 }]}>Mobile (for adding friends)</Text>
                        {isChangeMobile ? <TextInput keyboardType='numeric' maxLength={8} placeholder="Phone number" value={mobile} onChangeText={setMobile} style={[styles.fontSize, { backgroundColor: "white", borderRadius: 10, minWidth: 270, maxWidth: 270, padding: 10 }]} /> : <Text style={[styles.fontSize, { padding: 10 }]}>{mobile}</Text>}
                    </View>
                    <View>
                        <Text>{isChangeMobile ? <FontAwesome name='check' size={40} onPress={changeMobile} /> : <FontAwesome name='pencil' size={40} onPress={changeMobile} />}</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.fontSize, { fontWeight: "bold", fontSize: 22, paddingLeft: 10 }]}>Email</Text>
                        {isChangeEmail ? <TextInput autoCapitalize='none' maxLength={22} placeholder="Email Address" value={email} onChangeText={setEmail} style={[styles.fontSize, { backgroundColor: "white", borderRadius: 10, minWidth: 270, maxWidth: 270, padding: 10 }]} /> : <Text style={[styles.fontSize, { padding: 10 }]}>{email}</Text>}
                    </View>
                    <View>
                        <Text>{isChangeEmail ? <FontAwesome name='check' size={40} onPress={changeEmail} /> : <FontAwesome name='pencil' size={40} onPress={changeEmail} />}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.itemContainer} onPress={onLogout}>
                    <Text style={[styles.fontSize, { fontWeight: "bold", fontSize: 18, paddingLeft: 10, textAlign: "center" }]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}