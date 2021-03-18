import React, { useState, useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
    Alert,
} from "react-native";
import { codes } from "../model/firebaseHandlers";
import { getUserDetails, signIn } from "../model/interface";
import * as Crypto from "expo-crypto";

export default function SellerLogin({ navigation }) {
    // console.log("SellerLogin:", navigator);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailBorder, setEmailBorder] = useState("#fff");
    const [passwordBorder, setPasswordBorder] = useState("#fff");
    const [isLoading, setLoading] = useState(true);

    if (isLoading) {
        getUserDetails(false, (seller) => {
            if (seller != codes.NOT_FOUND) {
                navigation.navigate("SellerDashboard");
            }
        });
        setLoading(false);
    }
    const loginHandler = () => {
        let noProb = true;
        if (email == "") {
            setEmailBorder("#f00");
            noProb = false;
        }
        if (password == "" || password.length < 6) {
            setPasswordBorder("#f00");
            noProb = false;
        }
        if (noProb) {
            (async () => {
                const digest = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA512,
                    password
                );
                signIn(email, digest, false, (seller) => {
                    if (seller != codes.NOT_FOUND) {
                        Alert.alert(
                            "Sign In Successful",
                            "You have been successfully signed in",
                            [
                                {
                                    text: "Okay",
                                    onPress: () =>
                                        navigation.navigate("SellerDashboard"),
                                },
                            ]
                        );
                    } else {
                        Alert.alert(
                            "Invalid Login!",
                            "Email or password does not exist.",
                            [
                                {
                                    text: "Okay",
                                    onPress: () => console.log("OK Pressed"),
                                },
                            ]
                        );
                    }
                });
            })();
        }
    };
    return (
        <View style={styles.container}>
            <Text style={[styles.margin, styles.text, styles.width]}>
                Email
            </Text>
            <TextInput
                style={[
                    styles.text,
                    styles.width,
                    { borderColor: emailBorder, borderWidth: 1 },
                ]}
                placeholder="Email"
                onChangeText={(text) => {
                    setEmail(text);
                }}
                autoCapitalize="none"
                value={email}
            />
            <Text style={[styles.margin, styles.text, styles.width]}>
                Password
            </Text>
            <TextInput
                style={[
                    styles.text,
                    styles.width,
                    { borderColor: passwordBorder, borderWidth: 1 },
                ]}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                    setPassword(text);
                }}
                value={password}
            />
            <TouchableOpacity
                onPress={loginHandler}
                style={[styles.margin, , styles.btn]}
                title=""
            >
                <Text style={[styles.text, { color: "white" }]}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
                <Text style={[styles.text]}>Don't have an account? </Text>
                <Button
                    onPress={() => navigation.push("SellerSignUp")}
                    style={[styles.text]}
                    title="Sign Up"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        backgroundColor: "white",
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    margin: {
        marginTop: 10,
    },
    text: { fontSize: 24, padding: 5 },
    btn: {
        width: 200,
        backgroundColor: "#007AFF",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        color: "white",
        borderRadius: 8,
    },
    width: {
        width: "100%",
    },
});
