import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from "react-native";
import { getUserDetails, updateUser } from "../model/interface";
import CustomHeader from "./CustomHeader";

export default function UserTab({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [nameColor, setNameColor] = useState("#eeeeee");
    const [phoneColor, setPhoneColor] = useState("#eeeeee");
    const [addressColor, setAddressColor] = useState("#eeeeee");
    if (isLoading) {
        getUserDetails(true, (user) => {
            setUser(user);
            setName(user.name);
            setPhoneNo(Number(user.phoneNo));
            setAddress(user.address);
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
        if (phoneNo == "") {
            setPhoneColor("#f00");
            noProb = false;
            Alert.alert(
                "Invalid Phone Number!",
                "Phone Number cannot be empty.",
                [{ text: "Okay", onPress: () => console.log("OK Pressed") }]
            );
        }
        if (address == "") {
            setAddressColor("#f00");
            noProb = false;
            Alert.alert("Invalid Address!", "Address cannot be empty.", [
                { text: "Okay", onPress: () => console.log("OK Pressed") },
            ]);
        }
        if (noProb) {
            setUser((u) => {
                u.name = name;
                u.phoneNo = phoneNo;
                u.address = address;
                updateUser(true, u, (reply) => {
                    // console.log("reply: ", reply);
                });
                Keyboard.dismiss();
                return u;
            });
        }
    };
    const changePasswordHandler = () => {
        route.params.stackMoveCallback("ChangePassword");
    };
    const ordersHandler = () => {
        route.params.stackMoveCallback("OldOrders");
    };
    const loginFunc = () => {
        route.params.stackMoveCallback("SignInScreen");
    };

    const logoutFunc = () => {
        signOut();
    };
    const searchFunc = (text) => {
        route.params.stackMoveCallback("Products List", { searchText: text });
    };
    if (user) {
        return (
            <View style={styles.container}>
                <CustomHeader
                    loginFunc={loginFunc}
                    logoutFunc={logoutFunc}
                    searchFunc={searchFunc}
                />
                <View style={{ padding: 10 }}>
                    <Text style={styles.head}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={[styles.input, { borderColor: nameColor }]}
                        placeholder="Name"
                    />
                    <Text style={styles.head}>Phone Number</Text>
                    <TextInput
                        value={String(phoneNo)}
                        onChangeText={(text) => setPhoneNo(Number(text))}
                        style={[styles.input, { borderColor: phoneColor }]}
                        keyboardType="numeric"
                        placeholder="Phone Number"
                    />
                    <Text style={styles.head}>Address</Text>
                    <TextInput
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        style={[styles.input, { borderColor: addressColor }]}
                        placeholder="Address"
                    />
                    <TouchableOpacity
                        onPress={saveHandler}
                        style={[styles.blueBtn, { marginTop: 20 }]}
                    >
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                    <View
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
                    </View>
                    <TouchableOpacity
                        style={[styles.blueBtn, { marginTop: 10 }]}
                        onPress={ordersHandler}
                    >
                        <Text style={styles.text}>View Your Orders</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <CustomHeader
                    loginFunc={loginFunc}
                    logoutFunc={logoutFunc}
                    searchFunc={searchFunc}
                />
                <Text style={{ fontSize: 24, marginLeft: 10 }}>
                    You need to login for this action!
                </Text>
            </View>
        );
    }
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
