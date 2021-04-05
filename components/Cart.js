import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getUserDetails, signOut, updateUser } from "../model/interface";
import { useFocusEffect } from "@react-navigation/native";
import CustomHeader from "./CustomHeader";
import { FlatList } from "react-native-gesture-handler";
import CartItem from "./CartItem";
import { RefreshControl } from "react-native";
import { codes } from "../model/expressHandler";

export default function Cart({ navigation, route }) {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const userDetailsCallback = (user) => {
        // console.log("user", user);
        if (user != codes.NOT_FOUND) {
            setUser(user);
            setCartItems(user.cart);
            calculateSubTotal(user.cart);
        }
    };
    const calculateSubTotal = (products) => {
        let total = 0;
        products.forEach((item) => {
            total += item.product.price * item.quantity;
        });
        setSubTotal(total);
    };
    const changeUpdate = () => {
        loadData();
    };

    const loadData = () => {
        route.params.setFocusFunction(changeUpdate);
        getUserDetails(true, userDetailsCallback);
    };
    useFocusEffect(
        React.useCallback(() => {
            loadData();
            return () => {
                route.params.deRegisterFocus();
            };
        }, [])
    );

    const updateQuantiy = (id, quantity) => {
        setUser((ogUser) => {
            ogUser.cart.forEach((product) => {
                if (product._id == id) {
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
        setUser((ogUser) => {
            ogUser.cart = ogUser.cart.filter((item) => item._id != id);
            updateUser(true, ogUser, (reply) => {});
            setCartItems((items) => {
                return items.filter((item) => item._id != id);
            });
            calculateSubTotal(ogUser.cart);
            return ogUser;
        });
    };

    const placeOrderHandler = () => {
        route.params.stackMoveCallback("ContactForBuy");
    };

    const loginFunc = () => {
        route.params.stackMoveCallback("SignInScreen");
    };

    const logoutFunc = () => {
        signOut(() => {
            console.log("logged out");
        });
    };

    const searchFunc = (text) => {
        route.params.stackMoveCallback("Products List", { searchText: text });
    };

    if (user) {
        if (user.cart.length > 0) {
            return (
                <View style={styles.container}>
                    <CustomHeader
                        loginFunc={loginFunc}
                        logoutFunc={logoutFunc}
                        searchFunc={searchFunc}
                    />
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
                        refreshControl={
                            <RefreshControl
                                //  refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    // setLoading(true);
                                    loadData();
                                }}
                            />
                        }
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
                            onPress={placeOrderHandler}
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
        } else {
            return (
                <View style={styles.container}>
                    <CustomHeader
                        loginFunc={loginFunc}
                        logoutFunc={logoutFunc}
                        searchFunc={searchFunc}
                    />
                    <Text style={styles.text}>The Cart is empty!</Text>
                </View>
            );
        }
    } else {
        return (
            <View style={styles.container}>
                <CustomHeader
                    loginFunc={loginFunc}
                    logoutFunc={logoutFunc}
                    searchFunc={searchFunc}
                />
                <Text style={styles.text}>
                    You need to login to maintain cart!
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 20,
    },
    text: {
        fontSize: 24,
        marginLeft: 10,
    },
});
