import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { codes } from "../model/expressHandler";
import { getUserDetails, placeOrder, updateUser } from "../model/interface";
import { Order, Product } from "../model/models";
import { images } from "../Utils";
import CustomHeader from "./CustomHeader";

export default function ContactForBuy({ navigation, route }) {
    // console.log(route);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
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
            // console.log(noProb);
            let order = new Order([], name, phoneNo, address);
            route.params.forEach((product) => {
                order.addProduct(product);
            });
            let u = user;
            u.cart = [];
            u.addOrder(order);
            updateUser(true, u, (reply) => {
                if (reply == codes.INSERTION_SUCCESS) {
                    placeOrder(order, () => {
                        Alert.alert(
                            "Order Placed!",
                            "Your Order was successfully placed.",
                            [
                                {
                                    text: "Okay",
                                    onPress: () => {
                                        setUser(u);
                                        navigation.pop();
                                    },
                                },
                            ]
                        );
                    });
                }
            });
            // placeOrder(order, () => {
            //     window.location.replace("orders.html");
            // });
        }
    };
    return (
        <View style={styles.container}>
            {/* <CustomHeader /> */}
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
                    <Text style={styles.text}>Place Order</Text>
                </TouchableOpacity>
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
