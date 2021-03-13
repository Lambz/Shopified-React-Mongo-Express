import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    TextInput,
    Keyboard,
} from "react-native";
import { getUserDetails, updateUser } from "../model/interface";
import CustomHeader from "./CustomHeader";
import { FlatList } from "react-native-gesture-handler";
import CartItem from "./CartItem";

export default function UserTab({ navigation, route }) {
    console.log(route);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    if (isLoading) {
        getUserDetails(true, (user) => {
            // console.log("return");
            setUser(user);
            setName(user.name);
            setPhoneNo(Number(user.phoneNo));
            setAddress(user.address);
        });
        setLoading(false);
    }
    const saveHandler = () => {
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
    };
    const changePasswordHandler = () => {};
    return (
        <View style={styles.container}>
            <CustomHeader />
            <View style={{ padding: 10 }}>
                <TouchableOpacity style={styles.blueBtn}>
                    <Text style={styles.text}>View Your Orders</Text>
                </TouchableOpacity>
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                    placeholder="Name"
                />
                <TextInput
                    value={String(phoneNo)}
                    onChangeText={(text) => setPhoneNo(Number(text))}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Phone Number"
                />
                <TextInput
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    style={styles.input}
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
        borderColor: "#eeeeee",
        borderRadius: 4,
        marginTop: 10,
    },
});
