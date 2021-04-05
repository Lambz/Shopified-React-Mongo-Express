import React, { useState, useRef } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { getUserDetails } from "../model/interface";
import CustomHeader from "./CustomHeader";
import OrderItem from "./OrderItem";
import { useFocusEffect } from "@react-navigation/native";

export default function OldOrders({ navigation, route }) {
    const [orders, setOrders] = useState([]);
    const orderClicked = (order) => {
        navigation.navigate("OrderDetails", order);
    };

    const loadData = () => {
        getUserDetails(true, (user) => {
            // console.log(orders);
            console.log(user.orders);
            setOrders(user.orders);
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            loadData();
            return () => {};
        }, [])
    );
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatlist}
                data={orders}
                renderItem={({ item }) => (
                    <OrderItem item={item} orderClicked={orderClicked} />
                )}
                keyExtractor={(item) => item.id}
                extraData={orders}
            />
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
