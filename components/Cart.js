import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getUserDetails, updateUser } from "../model/interface";
import CustomHeader from "./CustomHeader";
import { FlatList } from "react-native-gesture-handler";
import CartItem from "./CartItem";

export default function Cart({ navigation }) {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const userDetailsCallback = (user) => {
        setUser(user);
        setCartItems(user.cart);
        calculateSubTotal(user.cart);
    };
    const calculateSubTotal = (products) => {
        // console.log(products);
        products.forEach((item) => {
            setSubTotal(subTotal + item.price * item.quantity);
        });
    };
    if (isLoading) {
        getUserDetails(true, userDetailsCallback);
        setLoading(false);
    }
    const updateQuantiy = (id, quantity) => {
        setUser((ogUser) => {
            ogUser.cart.forEach((product) => {
                if (product.id == id) {
                    product.quantity = Number(quantity);
                }
            });
            // console.log(ogUser);
            updateUser(true, ogUser, (reply) => {
                // console.log("got reply", reply);
            });
            calculateSubTotal(ogUser.cart);
            return ogUser;
        });
    };

    const removeProduct = (id) => {
        // console.log("productID:", id);
        setUser((ogUser) => {
            ogUser.cart = ogUser.cart.filter((item) => item.id != id);
            updateUser(true, ogUser, (reply) => {});
            setCartItems((items) => {
                return items.filter((item) => item.id != id);
            });
            calculateSubTotal(ogUser.cart);
            return ogUser;
        });
    };
    return (
        <View style={styles.container}>
            <CustomHeader />
            <FlatList
                style={styles.flatlist}
                data={cartItems}
                renderItem={({ item }) => (
                    <CartItem
                        item={item}
                        updateQuantiy={updateQuantiy}
                        removeProduct={removeProduct}
                    />
                )}
                keyExtractor={(item) => item.id}
                extraData={cartItems.length}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignContent: "center",
                    borderTopColor: "#eeeeee",
                    borderTopWidth: 1,
                    paddingTop: 10,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: "#4089d6",
                        justifyContent: "center",
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "white" }}>Place Order</Text>
                </TouchableOpacity>
                <View>
                    <Text>Sub-total: {subTotal}</Text>
                    <Text>HST: {(subTotal * 0.13).toFixed(2)}</Text>
                    <Text>Total: {(subTotal * 1.13).toFixed(2)}</Text>
                </View>
            </View>
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
