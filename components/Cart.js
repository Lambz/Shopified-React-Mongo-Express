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
import {
    fetchMostSoldProducts,
    fetchAllProducts,
    getRandomProductFromDB,
    getUserDetails,
} from "../model/interface";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { images } from "../Utils";
import CustomHeader from "./CustomHeader";
import { FlatList } from "react-native-gesture-handler";
import CartItem from "./CartItem";

const { width: screenWidth } = Dimensions.get("window");

export default function Cart({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const userDetailsCallback = (user) => {
        // console.log("userDetailsCallback: ", reply);
        setCartItems(user.cart);
        console.log(cartItems);
    };
    if (isLoading) {
        getUserDetails(true, userDetailsCallback);
        setLoading(false);
    }
    return (
        <View style={styles.container}>
            <CustomHeader />
            <FlatList
                style={styles.flatlist}
                data={cartItems}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item.id}
                extraData={cartItems.length}
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
});
