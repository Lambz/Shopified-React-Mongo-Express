import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Alert,
} from "react-native";
import { codes } from "../model/firebaseHandlers";
import { getUserDetails, updateUser } from "../model/interface";
import { Header } from "react-native-elements";

export default function SellerSettings({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [seller, setSeller] = useState(null);
    const [name, setName] = useState("");
    const [cName, setCName] = useState("");
    const [nameColor, setNameColor] = useState("#eeeeee");
    const [cColor, setCColor] = useState("#eeeeee");
    if (isLoading) {
        getUserDetails(false, (seller) => {
            if (seller != codes.NOT_FOUND) {
                setName(seller.name);
                setCName(seller.company);
                setSeller(seller);
            }
        });
        setLoading(false);
    }
    const saveHandler = () => {
        let noProb = true;
        if (name == "") {
            setNameColor("#f00");
            noProb = false;
            Alert.alert("Invalid Name!", "Name cannot be empty.", [
                { text: "Okay", onPress: () => console.log("OK Pressed") },
            ]);
        }
        if (cName == "") {
            setCColor("#f00");
            noProb = false;
            Alert.alert(
                "Invalid Company Name!",
                "Company name cannot be empty.",
                [{ text: "Okay", onPress: () => console.log("OK Pressed") }]
            );
        }
        if (noProb) {
            setSeller((val) => {
                val.name = name;
                val.company = cName;
                updateUser(false, val, (reply) => {
                    if (reply == codes.INSERTION_SUCCESS) {
                        Alert.alert(
                            "Successfully updated",
                            "Your information has been successfully updated!",
                            [
                                {
                                    text: "Okay",
                                    onPress: () => console.log("OK Pressed"),
                                },
                            ]
                        );
                    }
                });
                Keyboard.dismiss();
                return val;
            });
        }
    };
    const changePasswordHandler = () => {
        route.params.stackMoveCallback("ChangePassword");
    };

    const signOutClicked = () => {
        signOut((code) => {
            if (code == codes.LOGOUT_SUCCESS) {
                route.params.resetToTop();
            }
        });
    };
    return (
        <View style={styles.container}>
            <Header
                centerComponent={{
                    text: "Shopified Seller",
                    style: {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        width: "150%",
                    },
                }}
                rightComponent={{
                    icon: "logout",
                    color: "#fff",
                    onPress: signOutClicked,
                }}
            />

            <View style={{ padding: 10 }}>
                <Text style={styles.head}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={[styles.input, { borderColor: nameColor }]}
                    placeholder="Name"
                />
                <Text style={styles.head}>Company Name</Text>
                <TextInput
                    value={cName}
                    onChangeText={(text) => setCName(text)}
                    style={[styles.input, { borderColor: cColor }]}
                    placeholder="Company Name"
                />
                <TouchableOpacity
                    onPress={saveHandler}
                    style={[styles.blueBtn, { marginTop: 20 }]}
                >
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                {/* <View
                    style={{
                        flexDirection: "row",
                        marginTop: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                        onPress={changePasswordHandler}
                        style={[
                            styles.blueBtn,
                            {
                                width: "48%",
                            },
                        ]}
                    >
                        <Text style={styles.text}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            {
                                backgroundColor: "#dd1111",
                                borderRadius: 8,
                                padding: 5,
                                width: "48%",
                            },
                        ]}
                    >
                        <Text style={styles.text}>Delete Account</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 20,
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
    },
    input: {
        fontSize: 24,
        backgroundColor: "#f7f7f7",
        padding: 5,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 5,
    },
    head: {
        marginTop: 20,
    },
});
