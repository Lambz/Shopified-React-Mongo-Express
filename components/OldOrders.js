import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { getUserDetails } from "../model/interface";
import CustomHeader from "./CustomHeader";
import { FlatList } from "react-native-gesture-handler";
import OrderItem from "./OrderItem";

export default function OldOrders({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    if (isLoading) {
        getUserDetails(true, (user) => {
            setOrders(user.orders);
        });
        setLoading(false);
    }
    const orderClicked = (order) => {
        navigation.navigate("OrderDetails", order);
    };
    return (
        <View style={styles.container}>
            <CustomHeader />
            <FlatList
                style={styles.flatlist}
                data={orders}
                renderItem={({ item }) => (
                    <OrderItem item={item} orderClicked={orderClicked} />
                )}
                keyExtractor={(item) => item.id}
                extraData={orders.length}
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
