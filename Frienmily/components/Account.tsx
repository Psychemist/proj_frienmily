import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUpdateEmail, fetchUpdateGender, fetchUpdateMobileNumber } from "../redux/user/thunk";
import ModalDropdown from 'react-native-modal-dropdown';
import { logout } from "../redux/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GENDERS = ["Male", "Female", "Others"]

export default function Account() {
    // 在 Redux 取資料
    const usernameInRedux = useSelector((state: RootState) => state.user.username)
    const genderInRedux = useSelector((state: RootState) => state.user.gender)
    const mobileInRedux = useSelector((state: RootState) => state.user.mobile)
    const emailInRedux = useSelector((state: RootState) => state.user.email)
    const profilePictureInRedux = useSelector((state: RootState) => state.user.profilePicture)

    const genderIndex = GENDERS.indexOf(genderInRedux!)

    console.log("profilePictureInRedux: ", profilePictureInRedux)

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    if (isLoggedIn == true) {
        console.log("isLoggedIn is true at User Profile Screen")
    } else {
        console.log("isLoggedIn is false at User Profile Screen")
    }

    // 設定初始值
    const [username, __] = useState(usernameInRedux)
    const [gender, setGender] = useState(genderIndex)
    const [mobile, setMobile] = useState(mobileInRedux)
    const [email, setEmail] = useState(emailInRedux)

    const [isGenderEditable, setIsGenderEditable] = useState(false)
    const [isMobileEditable, setIsMobileEditable] = useState(false)
    const [isEmailEditable, setIsEmailEditable] = useState(false)

    const navigation = useNavigation()
    const dispatch = useDispatch()



    // TODO: 離開此頁時，如果各個isEditable仍是true，則彈出視窗問用戶是否要放棄更改

    const enlargeProfilePicture = () => {
        navigation.navigate('UserProfilePicuture' as never)
    }
    const changeGender = async () => {
        if (isGenderEditable == true) {
            try {
                let updateGenderResult = await dispatch(fetchUpdateGender({ username, gender })).unwrap()
                console.log('fetchUpdateGender from unwrap = ', updateGenderResult)
            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
            console.log("Submitted new gender setting")
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

                let updateMobileNumberResult = await dispatch(fetchUpdateMobileNumber({ username, mobile })).unwrap()
                console.log('updateMobileNumberResult from unwrap = ', updateMobileNumberResult)

            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
            console.log("Submitted new mobile number")
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

                let updateEmailResult = await dispatch(fetchUpdateEmail({ username, email })).unwrap()
                console.log('updateEmailResult from unwrap = ', updateEmailResult)

            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
            console.log("Submitted new email address")
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


    const styles = StyleSheet.create({
        mainPage: {
            flex: 1,
            backgroundColor: "#F5F5F5"
        },
        title: {
            padding: 20,
            borderRadius: 10,
            fontSize: 30,
            fontWeight:"bold",
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
        BtnText: {
            fontSize: 20,
            // paddingRight: 10,
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

        logoutButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,

            marginRight: "9%",
            backgroundColor: 'white',
            // opacity: 1,
        },
        logoutItemContainer: {
            width: "96%",
            height: "17%",
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
            justifyContent: "space-around",
            alignItems: "center",
            // paddingRight: 20,
            paddingLeft: "29%",
            paddingTop: "5%",
            paddingBottom: "5%",
            borderRadius: 20,
            marginTop: 5,
            marginBottom: 5,

        }
    });

    return (
        <SafeAreaView style={styles.mainPage}>
            <StatusBar barStyle="dark-content" />
            {/* <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 25, paddingBottom: "1%" }}>Account</Text>
            </View> */}

            <Text style={styles.title}>Profile</Text>

            <View style={{ alignItems: "center" }}>

                <View style={[styles.itemContainer, { position: "relative" }]}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Username</Text>
                        <Text style={styles.fieldContentText}>{username}</Text>
                    </View>
                    <TouchableOpacity onPress={enlargeProfilePicture}>
                        <Image style={styles.userImage} source={{ uri: profilePictureInRedux! }} ></Image>
                    </TouchableOpacity>

                </View>


                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Gender</Text>
                        {isGenderEditable ?
                            <ModalDropdown options={GENDERS} defaultValue={GENDERS[gender]} onSelect={(a) => { setGender(Number(a)) }}
                                style={styles.inputField} dropdownTextStyle={{ fontSize: 18 }} />
                            :
                            <View>
                                <Text style={styles.fieldContentText}>{GENDERS[gender]}</Text>
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
                                    <Text style={[styles.fieldContentText, { color: "red" }]}>(Update your mobile number)</Text>
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
                                    <Text style={[styles.fieldContentText, { color: "red" }]}>(Update your email address)</Text>
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

            {/* <Text style={styles.title}>Options</Text> */ }

    <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={[styles.logoutItemContainer, { height: "30%" }]} onPress={onLogout}>
            <View ><Text style={styles.BtnText}>Logout</Text></View>
            <View style={styles.logoutButton}><Icon name='ios-exit-outline' style={styles.logoutBtn} /></View>
        </TouchableOpacity>

    </View>
        </SafeAreaView >
    )
}