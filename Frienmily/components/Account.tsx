import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Keyboard } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUpdateEmail, fetchUpdateGender, fetchUpdateMobileNumber } from "../redux/user/thunk";
import ModalDropdown from 'react-native-modal-dropdown';
import { logout } from "../redux/user/userSlice";
import { REACT_APP_API_SERVER } from "@env";

export const GENDERS = ["Male", "Female", "Others"]

export default function Account() {
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const userStore = useSelector((state: RootState) => state.user)
    const [username, setUsername] = useState('')
    const [gender, setGender] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [isGenderEditable, setIsGenderEditable] = useState(false)
    const [isMobileEditable, setIsMobileEditable] = useState(false)
    const [isEmailEditable, setIsEmailEditable] = useState(false)
    const navigation = useNavigation()

    const [isGuest, setIsGuest] = useState(false)
    console.log("userStore.isGuest: ", userStore.isGuest)

    useEffect(() => {
        if (isFocused) {
            setIsGuest(userStore.isGuest)
        }
    }, [isFocused]);

    useEffect(() => {
        setGender(userStore.gender!)
        setMobile(userStore.mobile!)
        setEmail(userStore.email!)
        setUsername(userStore.username!)

    }, [userStore.email, userStore.username, userStore.userId, userStore.profilePicture])

    const enlargeProfilePicture = () => {
        navigation.navigate('UserProfilePicuture' as never)
    }
    const changeGender = async () => {
        if (isGenderEditable == true) {
            try {
                await dispatch(fetchUpdateGender({ username, gender })).unwrap()
            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
        }
        setIsGenderEditable(!isGenderEditable)
    }
    const changeMobile = async () => {

        if (isMobileEditable == true) {
            try {
                const normalMobileNumberLength = 8
                if (!mobile || mobile.length != normalMobileNumberLength) {
                    Alert.alert(
                        'Invalid mobile number. Please input again.',
                        '',
                        [
                            {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                                style: 'cancel',
                            }
                        ]
                    );
                    return
                }
                await dispatch(fetchUpdateMobileNumber({ username, mobile })).unwrap()
            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
        }
        setIsMobileEditable(!isMobileEditable)
    }
    const changeEmail = async () => {

        if (isEmailEditable == true) {
            try {
                if (!email || !email.includes('@') || !email.includes('.')) {
                    Alert.alert(
                        'Invalid email address. Please input again.',
                        '',
                        [
                            {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                                style: 'cancel',
                            }
                        ]
                    );

                    return
                }
                await dispatch(fetchUpdateEmail({ username, email })).unwrap()

            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
        }
        setIsEmailEditable(!isEmailEditable)
    }
    const onLogout = async () => {

        Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        dispatch(logout())
                        navigation.navigate('Login' as never)
                    }
                },
            ]
        );
    }

    const onLogoutGuestMode = async () => {

        Alert.alert(
            'Are you sure you want to log out Guest Mode?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        dispatch(logout())
                        navigation.navigate('Login' as never)
                    }
                },
            ]
        );
    }

    const onDeleteAccount = async () => {
        Alert.alert(
            'Are you sure you want to delete your account?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        disableAccount()
                        navigation.navigate('Login' as never)
                    }
                },
            ]
        );
    }
    const disableAccount = async () => {
        await fetch(`${REACT_APP_API_SERVER}/user/disableAccount`, {
            method: 'POST',
            body: username,
        });
    }
    const styles = StyleSheet.create({
        mainPage: {
            flex: 1,
            backgroundColor: "#F5F5F5",
            position: "relative"
        },
        title: {
            padding: 20,
            borderRadius: 10,
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: 20
        },
        itemContainer: {
            width: "98%",
            height: "17%",
            backgroundColor: "white",
            shadowOffset: {
                height: 4,
                width: 2,
            },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 9,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: "5%",
            paddingBottom: "5%",
            borderRadius: 20,
            marginTop: 5,
            marginBottom: 5,

        },
        userImage: {
            width: 70,
            height: 70,
            borderRadius: 50,
            borderColor: "#47b4b1",
            // right: 5,
            marginRight: "5%",
            borderWidth: 4,
            postion: "absolute",
            // right: "-20%",
            // top: "-20%",
            shadowOpacity: 3,
            shadowColor: "lightgray",
            shadowRadius: 2,
            shadowOffset: {
                height: 0,
                width: 0,
            },
        },
        leftContainer: {
            maxWidth: "100%",
            justifyContent: "space-around"
        },
        fieldHeader: {
            fontSize: 20,
            paddingLeft: 10,
            marginBottom: 10,
            fontWeight: "300"
        },
        fieldContentText: {
            paddingLeft: 10,
            fontSize: 20,
            padding: 10,
            fontWeight: '300',
            color: '#47b4b1'
        },
        inputField: {
            boxSizing: 'border-box',
            backgroundColor: "rgba(71, 180, 177, 0.3)",
            fontSize: 16,
            // shadowColor: "#47b4b1",
            borderRadius: 10,
            minWidth: 250,
            maxWidth: 250,
            padding: 10,
            marginTop: 1,
            shadowColor: "lightgray",
            shadowRadius: 2,
            shadowOffset: {
                height: 0,
                width: 0,
            },
        },
        editBtn: {
            fontSize: 15,
            justifyContent: 'center',
            alignItems: 'center',
            color: "white",

        },
        logoutBtnText: {
            fontSize: 20,
            paddingLeft: 60,
            color: "white",
            fontWeight: "bold"
        },
        deleteBtnText: {
            fontSize: 20,
            paddingLeft: 60,
            color: "white",
            fontWeight: "bold"
        },

        tickBtn: {
            fontSize: 20,
            justifyContent: 'center',
            alignItems: 'center',
            color: "white",

        },
        editTickButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            marginRight: "9%",
            backgroundColor: '#47b4b1',
            opacity: 1,
        },

        logoutBtn: {
            fontSize: 22,
            justifyContent: 'center',
            alignItems: 'center',
            color: "darkorange",
        },

        deleteAccountBtn: {
            fontSize: 22,
            justifyContent: 'center',
            alignItems: 'center',
            color: "rgb(236,64,52)",
        },

        logoutBtnWrapper: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,

            marginRight: "9%",
            backgroundColor: 'white',
            // opacity: 1,
        },
        deleteAccountBtnWrapper: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            // borderColor: "#47b4b1",
            // borderWidth: 2,
            marginRight: "9%",
            backgroundColor: 'white',
            // opacity: 1,
        },

        bottomBtnWrapper: {
            position: "absolute",
            bottom: 40,
            height: "20%",
            width: "100%",
            padding: 5,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
        },

        logoutItemContainer: {
            width: "100%",
            height: "50%",
            backgroundColor: "darkorange",
            shadowOffset: {
                height: 4,
                width: 2,
            },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 9,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // paddingTop: "1%",
            // paddingBottom: "1%",
            borderRadius: 20,
            marginTop: 6,
            marginBottom: 6,
        },
        deleteGroupItemContainer: {
            // borderColor: '#47b4b1',
            // borderWidth: 2,
            backgroundColor: "rgb(236,64,52)",
            height: "50%",
            width: "100%",
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 10,
            borderRadius: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white',
        },
        isGuestMask: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            margin: "1%",
            width: '98%',
            height: '60%',
            padding: 20,
            paddingTop: "5%",
            paddingBottom: "5%",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            //SHADOW
            borderRadius: 20,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {
                height: 4,
                width: 2,
            },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
        },
        isGuestMaskText: {
            fontSize: 20,
            color: "#47b4b1"
        }
    });

    return (
        <SafeAreaView style={styles.mainPage} onTouchStart={() => { Keyboard.dismiss() }}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Profile</Text>
            {isGuest ?
                <View style={styles.isGuestMask}>
                    <Text style={styles.isGuestMaskText}>Please Login to use this feature.</Text>
                </View>
                :
                <View style={{ alignItems: "center" }}>
                    <View style={[styles.itemContainer, { position: "relative" }]}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.fieldHeader}>Username</Text>
                            <Text style={styles.fieldContentText}>{username}</Text>
                        </View>
                        <TouchableOpacity onPress={enlargeProfilePicture}>
                            <Image style={styles.userImage} source={{ uri: userStore.profilePicture! }} ></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.fieldHeader}>Gender</Text>
                            {isGenderEditable ?
                                <ModalDropdown options={GENDERS} defaultValue={gender} onSelect={(a) => { setGender(GENDERS[Number(a)]) }}
                                    style={styles.inputField} dropdownTextStyle={{ fontSize: 18 }} />
                                :
                                <View>
                                    <Text style={styles.fieldContentText}>{gender}</Text>
                                </View>
                            }
                        </View>
                        {isGenderEditable ?
                            <TouchableOpacity style={styles.editTickButton} onPress={changeGender}>
                                <Text>
                                    <FontAwesome name='check' style={styles.tickBtn} />
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.editTickButton} onPress={changeGender}>
                                <Text>
                                    <FontAwesome name='pencil' style={styles.editBtn} />
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.fieldHeader}>Mobile</Text>
                            {isMobileEditable ?
                                <TextInput keyboardType='numeric' maxLength={8} style={styles.inputField}
                                    value={mobile!} onChangeText={setMobile}
                                />
                                :
                                (mobile ?
                                    <Text style={styles.fieldContentText}>{mobile}</Text>
                                    :
                                    <View>
                                    </View>

                                )
                            }
                        </View>
                        {isMobileEditable ?
                            <TouchableOpacity style={styles.editTickButton} onPress={changeMobile}>
                                <Text>
                                    <FontAwesome name='check' style={styles.tickBtn} />
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.editTickButton} onPress={changeMobile}>
                                <Text>
                                    <FontAwesome name='pencil' style={styles.editBtn} />
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.fieldHeader}>Email Address</Text>
                            {isEmailEditable ?
                                <TextInput autoCapitalize='none' maxLength={30} style={styles.inputField}
                                    value={email!} onChangeText={setEmail}
                                />
                                :
                                (email ?
                                    <Text style={styles.fieldContentText}>{email}</Text>
                                    :
                                    <View>
                                    </View>
                                )
                            }
                        </View>

                        {isEmailEditable ?
                            <TouchableOpacity style={styles.editTickButton} onPress={changeEmail}>
                                <Text>
                                    <FontAwesome name='check' style={styles.tickBtn} />
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.editTickButton} onPress={changeEmail}>
                                <Text>
                                    <FontAwesome name='pencil' style={styles.editBtn} />
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            }


            {isGuest ?
                <View style={styles.bottomBtnWrapper}>
                    <TouchableOpacity style={[styles.logoutItemContainer]} onPress={onLogoutGuestMode}>
                        <View ><Text style={styles.logoutBtnText}>Go back to Login Screen</Text></View>
                        <View style={styles.logoutBtnWrapper}><Icon name='ios-exit-outline' style={styles.logoutBtn} /></View>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.bottomBtnWrapper}>
                    <TouchableOpacity style={[styles.logoutItemContainer]} onPress={onLogout}>
                        <View ><Text style={styles.logoutBtnText}>Logout</Text></View>
                        <View style={styles.logoutBtnWrapper}><Icon name='ios-exit-outline' style={styles.logoutBtn} /></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteGroupItemContainer} onPress={onDeleteAccount}>
                        <View ><Text style={styles.deleteBtnText}>Delete Account</Text></View>
                        <View style={styles.deleteAccountBtnWrapper}><FontAwesome name='remove' style={styles.deleteAccountBtn} /></View>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView >
    )
}