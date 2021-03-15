import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { images } from "../Utils";

export default function ProductItem({ item, productClicked }) {
    let image = "";
    if (item.images.length > 0) {
        image = { uri: item.images[0] };
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
                    <Text>{item.name}</Text>
                    <Text>$ {item.price}</Text>
                    <Text>Seller: {item.seller}</Text>
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
    },
});
