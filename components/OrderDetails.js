import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import {
    getUserDetails,
    updateOrderStatus,
    updateUser,
} from "../model/interface";
import { OrderStatus } from "../model/models";
import { formatDate, images, getOrderStatus } from "../Utils";
import CustomHeader from "./CustomHeader";
import ProductItem from "./PoductItem";

export default function OrderDetails({ navigation, route }) {
    // console.log(route);
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [user, setUser] = useState(null);
    if (isLoading) {
        let item = route.params;
        let max = 0;
        let total = 0;
        item.products.forEach((product) => {
            // setTotal(total + Number(product.price));
            total +=
                Number(product.product.price) *
                Number(product.product.quantity);
            max = Math.max(max, product.product.estimatedTime);
        });
        setTotal(total);
        let date = new Date(item.createdAt);
        date.setDate(date.getDate() + max);
        setDeliveryDate(date);
        setProducts(item.products);
        setOrder(item);
        getUserDetails(true, (u) => {
            setUser(u);
        });
        setLoading(false);
    }

    const cancelHandler = () => {
        if (
            order.status == OrderStatus.PENDING ||
            order.status == OrderStatus.PROCESSING
        ) {
            updateOrderStatus(order, OrderStatus.CANCELLED, () => {
                order.status = OrderStatus.CANCELLED;
                navigation.pop();
            });
        }
    };

    const displayOrderDetails = () => {
        if (order) {
            return (
                <View
                    style={{
                        padding: 10,
                        borderTopWidth: 1,
                        borderTopColor: "#eeeeee",
                    }}
                >
                    <Text>Total: {(total * 1.13).toFixed(2)}</Text>
                    <Text>Ordered Date: {formatDate(order.createdAt)}</Text>
                    <Text>Estimated Delivery: {formatDate(deliveryDate)}</Text>
                    <Text>Status: {getOrderStatus(order.status)}</Text>
                    <Text>No. of Products: {order.products.length}</Text>
                    <TouchableOpacity
                        onPress={cancelHandler}
                        style={styles.blueBtn}
                    >
                        <Text style={styles.text}>Cancel Order</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };
    const productClicked = (product) => {
        console.log(product.name, " clicked!");
    };
    return (
        <SafeAreaView style={styles.container}>
            {/* <CustomHeader /> */}
            <Text style={{ fontSize: 28, marginLeft: 10, marginTop: 10 }}>
                Products
            </Text>
            <FlatList
                style={styles.flatlist}
                data={products}
                renderItem={({ item }) => (
                    <ProductItem item={item} productClicked={productClicked} />
                )}
                keyExtractor={(item) => item.id}
                extraData={products.length}
            />

            {displayOrderDetails()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
        margin: 10,
    },
});
