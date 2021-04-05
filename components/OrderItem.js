import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { formatDate, images, getOrderStatus } from "../Utils";

export default function OrderItem({ item, orderClicked }) {
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState(null);
    if (isLoading) {
        let im = null;
        let max = 0;
        item.products.forEach((product) => {
            setTotal(total + product.product.price);
            if (product.product.images.length > 0) {
                im = product.product.images[0];
            }
            max = Math.max(max, product.product.estimatedTime);
        });
        if (im == null) {
            setImage(images.productPlaceholder);
        } else {
            setImage({ uri: im });
        }
        let date = new Date(item.createdAt);
        date.setDate(date.getDate() + max);
        setDeliveryDate(date);
        setLoading(false);
    }
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    flexDirection: "row",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eeeeee",
                },
            ]}
            onPress={() => orderClicked(item)}
        >
            <View style={{ width: "60%" }}>
                <Text>Ordered Date: {formatDate(item.createdAt)}</Text>
                <Text>Estimated Delivery: {formatDate(deliveryDate)}</Text>
                <Text>Status: {getOrderStatus(item.status)}</Text>
                <Text>Total: {(total * 1.13).toFixed(2)}</Text>
                <Text>No. of Products: {item.products.length}</Text>
            </View>
            <Image
                style={{ width: "40%", resizeMode: "contain" }}
                source={image}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 20,
    },
});
