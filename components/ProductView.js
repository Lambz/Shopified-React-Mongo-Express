import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ProductDetail from "./ProductDetail";
const imageWidth = Dimensions.get("window");

export default function ProductView({ item, clickCallback }) {
    console.log("product", item.item.images[0]);
    const [product, setProduct] = useState(item.item);
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => clickCallback(product)}
            >
                <View style={styles.imageView}>
                    <Image
                        style={styles.image}
                        source={{ uri: product.images[0] }}
                    />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.price}>
                        <Text style={styles.bold}>CN $: </Text>
                        {product.price}
                    </Text>
                    <Text style={styles.estimatedTime}>
                        <Text style={styles.bold}>Ships in: </Text>
                        {product.estimatedTime} days
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        padding: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "lightgray",
    },
    imageView: {
        flex: 1,
        overflow: "hidden",
    },
    textView: {
        flex: 2,
        overflow: "hidden",
        margin: 0,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    image: {
        width: 100,
        height: 100,
    },
    bold: {
        fontWeight: "bold",
    },
    price: {
        color: "green",
        fontSize: 16,
    },
});
