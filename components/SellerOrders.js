import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Header } from "react-native-elements";
import { codes } from "../model/firebaseHandlers";
import * as Crypto from "expo-crypto";
import {
    fetchOrdersForSeller,
    getUID,
    getUserDetails,
    signIn,
} from "../model/interface";
import { FlatList } from "react-native-gesture-handler";
import { Order } from "../model/models";
import OrderItem from "./OrderItem";

export default function SellerOrders({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [seller, setSeller] = useState(null);
    if (isLoading) {
        getUserDetails(false, (seller) => {
            // console.log("Seller: ", seller);
            if (seller != null && seller != codes.NOT_FOUND) {
                setSeller(seller);
                // setOrders(seller.orders);
                // console.log(seller.orders);
                fetchOrdersForSeller(getUID(), true, (orders) => {
                    console.log(orders.length);
                    setOrders(orders);
                });
            }
        });
        setLoading(false);
    }
    const signOutClicked = () => {
        signOut((code) => {
            if (code == codes.LOGOUT_SUCCESS) {
                route.params.popToTop();
            }
        });
    };
    const orderClicked = (order) => {
        navigation.navigate("OrderDetails", order);
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
            <View style={{ padding: 10, flex: 1 }}>
                <Text style={{ fontSize: 28 }}>Orders</Text>
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <OrderItem item={item} orderClicked={orderClicked} />
                    )}
                />
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
        fontSize: 24,
        marginLeft: 10,
    },
});
