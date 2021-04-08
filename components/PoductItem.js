import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { images } from "../Utils";

export default function ProductItem({ item, productClicked }) {
    let i;
    if (item.product != null && item.product != undefined) {
        i = item.product;
    } else {
        i = item;
    }
    let image = "";
    if (i.images.length > 0) {
        image = { uri: i.images[0] };
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
                    <Text
                        style={{ fontSize: 20 }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {i.name}
                    </Text>
                    <Text>$ {i.price}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail">
                        {i.description}
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
