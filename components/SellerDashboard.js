import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import SellerSignUp from "./SellerSignUp";
import SellerLogin from "./SellerLogin";
import Home from "./Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Feather } from "@expo/vector-icons";
import Cart from "./Cart";
import UserTab from "./UserTab";
import SellerHome from "./SellerHome";
import SellerProducts from "./SellerProducts";

const Tabs = createBottomTabNavigator();
export default function SellerDashboard({ navigation }) {
    const stackMoveCallback = (name, object) => {
        navigation.navigate(name, object);
    };

    const pop = () => {
        navigation.pop();
    };

    const popToTop = () => {
        // console.log("called");
        navigation.popToTop();
    };
    // let focusFunction = null;
    // useFocusEffect(
    //     React.useCallback(() => {
    //         // console.log("change", focusFunction);
    //         if (focusFunction != null) {
    //             focusFunction();
    //         }
    //         return () => null;
    //     }, [])
    // );

    // const setFocusFunction = (func) => {
    //     // console.log("setting", func);
    //     focusFunction = func;
    // };

    // const deRegisterFocus = () => {
    //     // console.log("de-register");
    //     focusFunction = null;
    // };
    return (
        <NavigationContainer independent={true}>
            <Tabs.Navigator>
                {/* <Tabs.Screen name="1" component={SellerLogin} />
                <Tabs.Screen name="2" component={SellerSignUp} /> */}
                <Tabs.Screen
                    name="SellerHome"
                    component={SellerHome}
                    initialParams={{
                        stackMoveCallback: stackMoveCallback,
                        popToTop: popToTop,
                    }}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="home"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="SellerProducts"
                    component={SellerProducts}
                    initialParams={{
                        stackMoveCallback: stackMoveCallback,
                        popToTop: popToTop,
                    }}
                    options={{
                        tabBarLabel: "Products",
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="box" size={size} color={color} />
                        ),
                    }}
                />
                {/* <Tabs.Screen
                    name="Cart"
                    component={Cart}
                    initialParams={{
                        stackMoveCallback: stackMoveCallback,
                        setFocusFunction: setFocusFunction,
                        deRegisterFocus: deRegisterFocus,
                    }}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="cart-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="UserTab"
                    component={UserTab}
                    initialParams={{ stackMoveCallback: stackMoveCallback }}
                    options={{
                        tabBarLabel: "User",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account-circle-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                /> */}
            </Tabs.Navigator>
        </NavigationContainer>
    );
}
