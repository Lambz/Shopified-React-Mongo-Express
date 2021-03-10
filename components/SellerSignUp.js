import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";
import { and } from "react-native-reanimated";

export default function SellerSignUp({ navigation }) {
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [rPassword, setRPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailBorder, setEmailBorder] = useState("#fff");
    const [passwordBorder, setPasswordBorder] = useState("#fff");
    const [nameBorder, setNameBorder] = useState("#fff");
    const [comapnyBorder, setCompanyBorder] = useState("#fff");
    const [rPasswordBorder, setRPasswordBorder] = useState("#fff");

    const signUpHandler = () => {
        let noProb = true;
        if (name == "") {
            setNameBorder("#f00");
            noProb = false;
        }
        if (companyName == "") {
            setCompanyBorder("#f00");
            noProb = false;
        }
        if (email == "") {
            setEmailBorder("#f00");
            noProb = false;
        }
        if (password == "" || password.length < 6) {
            setPasswordBorder("#f00");
            noProb = false;
        }
        if (rPassword == "" || rPassword.length < 6) {
            setRPasswordBorder("#f00");
            noProb = false;
        }
        if (password != rPassword) {
            setPasswordBorder("#f00");
            setRPasswordBorder("#f00");
            noProb = false;
        }
        if (noProb) {
            //TODO: SignUP
        }
    };
    return (
        <View style={styles.container}>
            <Text style={[styles.margin, styles.text, styles.width]}>Name</Text>
            <TextInput
                style={[
                    styles.text,
                    styles.width,
                    { borderColor: nameBorder, borderWidth: 1 },
                ]}
                placeholder="Name"
                onChangeText={(text) => {
                    setName(text);
                }}
                value={name}
            />
            <Text style={[styles.margin, styles.text, styles.width]}>
                Company Name
            </Text>
            <TextInput
                style={[
                    styles.text,
                    styles.width,
                    { borderColor: comapnyBorder, borderWidth: 1 },
                ]}
                placeholder="Company Name"
                onChangeText={(text) => {
                    setCompanyName(text);
                }}
                value={companyName}
            />
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
            <Text style={[styles.margin, styles.text, styles.width]}>
                Re-type Password
            </Text>
            <TextInput
                style={[
                    styles.text,
                    styles.width,
                    { borderColor: rPasswordBorder, borderWidth: 1 },
                ]}
                placeholder="Re-type Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                    setRPassword(text);
                }}
                value={rPassword}
            />
            <TouchableOpacity
                onPress={signUpHandler}
                style={[styles.margin, , styles.btn]}
                title=""
            >
                <Text style={[styles.text, { color: "white" }]}>Sign Up</Text>
            </TouchableOpacity>
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
