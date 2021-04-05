import React, { useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
    getUserDetails,
    updateOrderStatus,
    updateUser,
} from "../model/interface";
import { OrderStatus } from "../model/models";
import { formatDate, images, getOrderStatus } from "../Utils";
import CustomHeader from "./CustomHeader";
import ProductItem from "./PoductItem";

export default function SellerOrderDetails({ navigation, route }) {
    // console.log(route);
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [user, setUser] = useState(null);
    const [defaultStatus, setDefaultStatus] = useState();
    const status = [
        { label: "PENDING", value: 0 },
        { label: "PROCESSING", value: 1 },
        { label: "ON WAY", value: 2 },
        { label: "DELIVERED", value: 3 },
        { label: "CANCELLED", value: 4 },
    ];
    if (isLoading) {
        let item = route.params;
        let max = 0;
        let total = 0;
        setDefaultStatus(item.status);
        item.products.forEach((product) => {
            // setTotal(total + Number(product.price));
            total += Number(product.price) * Number(product.quantity);
            max = Math.max(max, product.estimatedTime);
        });
        setTotal(total);
        let date = new Date(item.orderDate);
        date.setDate(date.getDate() + max);
        setDeliveryDate(date);
        setProducts(item.products);
        setOrder(item);
        getUserDetails(true, (u) => {
            setUser(u);
        });
        setLoading(false);
    }

    const statusChangeHandler = () => {
        updateOrderStatus(order, defaultStatus, (reply) => {
            Alert.alert(
                "Status updated",
                "Status of the product has been successfully updated!",
                [
                    {
                        text: "Okay",
                        onPress: () => navigation.pop(),
                    },
                ]
            );
        });
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
                    <DropDownPicker
                        items={status}
                        containerStyle={{
                            height: 40,
                            marginTop: 5,
                            zIndex: 1,
                        }}
                        style={{ backgroundColor: "#fafafa", zIndex: 9 }}
                        itemStyle={{
                            justifyContent: "flex-start",
                            zIndex: 1,
                        }}
                        dropDownStyle={{
                            backgroundColor: "#fafafa",
                            zIndex: 1,
                        }}
                        onChangeItem={(item) => setDefaultStatus(item.value)}
                        defaultValue={defaultStatus}
                    />
                    <Text style={{ marginTop: 10 }}>
                        Total: {(total * 1.13).toFixed(2)}
                    </Text>
                    <Text>Ordered Date: {formatDate(order.orderDate)}</Text>
                    <Text>Estimated Delivery: {formatDate(deliveryDate)}</Text>
                    <Text>Status: {getOrderStatus(order.status)}</Text>
                    <TouchableOpacity
                        onPress={statusChangeHandler}
                        style={styles.blueBtn}
                    >
                        <Text style={styles.text}>Change Status</Text>
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
        marginBottom: 20,
    },
});
