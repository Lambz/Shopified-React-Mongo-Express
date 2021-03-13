import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
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
    if (isLoading) {
        let item = route.params;
        let max = 0;
        item.products.forEach((product) => {
            setTotal(total + product.price);
            max = Math.max(max, product.estimatedTime);
        });
        let date = new Date(item.orderDate);
        date.setDate(date.getDate() + max);
        setDeliveryDate(date);
        setProducts(item.products);
        setOrder(item);
        setLoading(false);
    }
    const displayOrderDetails = () => {
        if (order) {
            return (
                <View style={{ padding: 10 }}>
                    <Text>Total: {(total * 1.13).toFixed(2)}</Text>
                    <Text>Ordered Date: {formatDate(order.orderDate)}</Text>
                    <Text>Estimated Delivery: {formatDate(deliveryDate)}</Text>
                    <Text>Status: {getOrderStatus(order.status)}</Text>
                    <Text>No. of Products: {order.products.length}</Text>
                </View>
            );
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader />
            <FlatList
                style={styles.flatlist}
                data={products}
                renderItem={({ item }) => <ProductItem item={item} />}
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
});
