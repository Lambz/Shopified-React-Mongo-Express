import React from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { signUp } from "../model/interface";
import { User } from "../model/models";
import { codes } from "../model/expressHandler";

const SignUpScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        name: "",
        username: "",
        password: "",
        confirm_password: "",
        phoneNumber: "",
        address: "",
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let cond = re.test(String(val).toLowerCase());
        if (cond) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
            });
        }
    };

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    };

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        });
    };

    const handlePhoneNumberChange = (val) => {
        setData({
            ...data,
            phoneNumber: val,
        });
    };

    const handleAddressChange = (val) => {
        setData({
            ...data,
            address: val,
        });
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        });
    };

    const handleNameChange = (val) => {
        setData({
            ...data,
            name: val,
        });
    };

    const signUpHandler = () => {
        let noProb = true;
        if (data.name == "") {
            noProb = false;
        }
        if (data.username == "") {
            noProb = false;
        }
        if (data.password == "") {
            noProb = false;
        }
        if (data.confirm_password == "") {
            noProb = false;
        }
        if (data.phoneNumber == "") {
            noProb = false;
        }
        if (data.address == "") {
            noProb = false;
        }
        if (data.password != data.confirm_password) {
            Alert.alert(
                "Password mismatch!",
                "Password and confirm password do not match!",
                [
                    {
                        text: "Okay",
                        onPress: () => console.log("OK Pressed"),
                    },
                ]
            );
            noProb = false;
        }
        if (noProb) {
            (async () => {
                const digest = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA512,
                    data.password
                );
                let user = new User(
                    data.name,
                    data.address,
                    data.phoneNumber,
                    data.username,
                    digest,
                    [],
                    []
                );
                signUp(user, true, (reply) => {
                    if (reply == codes.INSERTION_SUCCESS) {
                        Alert.alert(
                            "Registration Successful",
                            "You have been successfully registered!",
                            [
                                {
                                    text: "Okay",
                                    onPress: () => navigation.popToTop(),
                                },
                            ]
                        );
                    }
                });
            })();
        } else {
            Alert.alert(
                "Invalid Input!",
                "One or more fields have invalid inputs",
                [
                    {
                        text: "Okay",
                        onPress: () => console.log("OK Pressed"),
                    },
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="#009387" barStyle="light-content" /> */}
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_textInputChange ? (
                            <Animatable.View animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        ) : null}
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 20,
                            },
                        ]}
                    >
                        Name
                    </Text>
                    <View style={styles.action}>
                        <Feather name="user" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleNameChange(val)}
                        />
                    </View>

                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 20,
                            },
                        ]}
                    >
                        Password
                    </Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={
                                data.secureTextEntry ? true : false
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ? (
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                            ) : (
                                <Feather name="eye" color="grey" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 20,
                            },
                        ]}
                    >
                        Confirm Password
                    </Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={
                                data.confirm_secureTextEntry ? true : false
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) =>
                                handleConfirmPasswordChange(val)
                            }
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.secureTextEntry ? (
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                            ) : (
                                <Feather name="eye" color="grey" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 20,
                            },
                        ]}
                    >
                        Phone Number
                    </Text>
                    <View style={styles.action}>
                        <Feather name="phone" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Phone Number"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePhoneNumberChange(val)}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 20,
                            },
                        ]}
                    >
                        Address
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome5
                            name="address-card"
                            size={20}
                            color="#05375a"
                        />
                        <TextInput
                            placeholder="Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleAddressChange(val)}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text
                            style={[
                                styles.color_textPrivate,
                                { fontWeight: "bold" },
                            ]}
                        >
                            {" "}
                            Terms of service
                        </Text>
                        <Text style={styles.color_textPrivate}> and</Text>
                        <Text
                            style={[
                                styles.color_textPrivate,
                                { fontWeight: "bold" },
                            ]}
                        >
                            {" "}
                            Privacy policy
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={signUpHandler}
                        >
                            <View
                                // colors={["#08d4c4", "#01ab9d"]}
                                style={[
                                    styles.signIn,
                                    { backgroundColor: "#4089d6" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: "#fff",
                                        },
                                    ]}
                                >
                                    Sign Up
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                            style={[
                                styles.signIn,
                                {
                                    borderColor: "#4089d6",
                                    borderWidth: 1,
                                    marginTop: 15,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: "#4089d6",
                                    },
                                ]}
                            >
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4089d6",
    },
    header: {
        paddingTop: 50,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    footer: {
        flex: Platform.OS === "ios" ? 3 : 5,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18,
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: "#05375a",
    },
    button: {
        alignItems: "center",
        marginTop: 20,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
    },
    textPrivate: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 20,
    },
    color_textPrivate: {
        color: "grey",
    },
});
