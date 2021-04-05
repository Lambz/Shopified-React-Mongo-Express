import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { getUserDetails, updatePassword, updateUser } from "../model/interface";
import CustomHeader from "./CustomHeader";
import { FlatList, TextInput } from "react-native-gesture-handler";
import CartItem from "./CartItem";
import * as Crypto from "expo-crypto";
import { codes } from "../model/expressHandler";

export default function ChangePassword({ navigation }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRPassword, setNewRPassword] = useState("");
    const [oBorderColor, setOBorderColor] = useState("#ffffff");
    const [nBorderColor, setNBorderColor] = useState("#fff");
    const [rBorderColor, setRBorderColor] = useState("#fff");
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    if (isLoading) {
        getUserDetails(true, (user) => {
            setUser(user);
        });
        setLoading(false);
    }
    const changePasswordHandler = () => {
        let noProb = true;
        if (oldPassword == "" || oldPassword.length < 6) {
            Alert.alert(
                "Invalid Old Password!",
                "The password must be at least of 6 characters",
                [{ text: "Okay", onPress: () => console.log("OK Pressed") }]
            );
            setOBorderColor("#f00");
            noProb = false;
        }
        if (newPassword == "" || newPassword.length < 6) {
            Alert.alert(
                "Invalid New Password!",
                "The password must be at least of 6 characters",
                [{ text: "Okay", onPress: () => console.log("OK Pressed") }]
            );
            setNBorderColor("#f00");
            noProb = false;
        }
        if (newRPassword == "" || newRPassword.length < 6) {
            Alert.alert(
                "Invalid New Password!",
                "The password must be at least of 6 characters",
                [{ text: "Okay", onPress: () => console.log("OK Pressed") }]
            );
            setRBorderColor("#f00");
            noProb = false;
        }
        if (newRPassword != newPassword) {
            Alert.alert(
                "Password mismatch!",
                "New password and re-type password does not match",
                [{ text: "Okay", onPress: () => console.log("OK Pressed") }]
            );
            setNBorderColor("#f00");
            setRBorderColor("#f00");
            noProb = false;
        }
        if (noProb) {
            (async () => {
                const digest = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA512,
                    oldPassword
                );
                // console.log("Digest: ", digest);
                /* Some crypto operation... */
                // console.log("olddigest", digest);
                if (digest != user.password) {
                    Alert.alert(
                        "Invalid Old Password!",
                        "Password does not match with the old password!",
                        [
                            {
                                text: "Okay",
                                onPress: () => console.log("OK Pressed"),
                            },
                        ]
                    );
                    setOBorderColor("#f00");
                    noProb = false;
                }
                if (noProb) {
                    // console.log("trying");
                    (async () => {
                        const digest = await Crypto.digestStringAsync(
                            Crypto.CryptoDigestAlgorithm.SHA512,
                            newPassword
                        );
                        // console.log("Digest: ", digest);
                        updatePassword(true, user, digest, (reply) => {
                            // console.log("reply: ", reply);
                            if (reply == codes.INSERTION_SUCCESS) {
                                Alert.alert(
                                    "Successful!",
                                    "Your password has been successfully changed!",
                                    [
                                        {
                                            text: "Okay",
                                            onPress: () => navigation.pop(),
                                        },
                                    ]
                                );
                            }
                        });
                    })();
                }
            })();
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Old Password</Text>
            <TextInput
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
                style={[styles.input, { borderColor: oBorderColor }]}
                placeholder="Old Password"
                secureTextEntry={true}
            />
            <Text style={styles.head}>New Password</Text>
            <TextInput
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                style={[styles.input, { borderColor: nBorderColor }]}
                placeholder="New Password"
                secureTextEntry={true}
            />
            <Text style={styles.head}>Re-type New Password</Text>
            <TextInput
                value={newRPassword}
                onChangeText={(text) => setNewRPassword(text)}
                style={[styles.input, { borderColor: rBorderColor }]}
                placeholder="Re-type New Password"
                secureTextEntry={true}
            />
            <TouchableOpacity
                onPress={changePasswordHandler}
                style={styles.blueBtn}
            >
                <Text style={styles.text}>Change Password</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    input: {
        fontSize: 24,
        backgroundColor: "#f7f7f7",
        padding: 5,
        borderWidth: 1,
        borderColor: "#eeeeee",
        borderRadius: 4,
        marginTop: 5,
    },
    head: {
        marginTop: 20,
    },
    text: {
        fontSize: 22,
        color: "white",
        textAlign: "center",
    },
    blueBtn: {
        backgroundColor: "#4089d6",
        borderRadius: 8,
        padding: 5,
        marginTop: 20,
    },
});
