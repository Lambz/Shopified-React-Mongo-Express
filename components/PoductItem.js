import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { images } from "../Utils";

export default function ProductItem({ item, productClicked }) {
    let image = "";
    if (item.product.images.length > 0) {
        image = { uri: item.product.images[0] };
    } else {
        image = images.productPlaceholder;
    }

    return (
        <TouchableOpacity
            onPress={() => productClicked(item)}
            style={styles.container}
        >
            <View style={[styles.rows]}>
                <Image
                    style={{ width: "40%", resizeMode: "contain" }}
                    source={image}
                />
                <View style={{ width: "60%" }}>
                    <Text style={{ fontSize: 20 }}>{item.product.name}</Text>
                    <Text>$ {item.product.price}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail">
                        {item.product.description}
                    </Text>
                    {/* <Text>Seller: {item.product.seller.company}</Text> */}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
    },
    rows: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 70,
    },
});
