import React, { useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
    Dimensions,
    ScrollView,
    Image,
} from "react-native";
import { images } from "../Utils";

export default function CartItem({ item }) {
    let image = "";
    if (item.images.length > 0) {
        image = { uri: item.images[0] };
    } else {
        image = images.productPlaceholder;
    }
    console.log(item.name, item.quantity);
    return (
        <View style={styles.container}>
            <View style={[styles.rows]}>
                <Image
                    style={{ width: "40%", resizeMode: "contain" }}
                    source={image}
                />
                <View style={{ width: "60%" }}>
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                </View>
            </View>
            <View style={[styles.rows, { marginTop: 10 }]}>
                <View style={[styles.rows]}>
                    <Text>Quantity:</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={{
                            width: "20%",
                            backgroundColor: "#f7f7f7",
                            borderRadius: 4,
                            textAlign: "center",
                        }}
                        value={String(item.quantity)}
                    />
                </View>
                <TouchableOpacity>
                    <Text>Update Quantity</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
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
