import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    CommonActions,
    NavigationContainer,
    useFocusEffect,
} from "@react-navigation/native";
import SellerSignUp from "./SellerSignUp";
import SellerLogin from "./SellerLogin";
import Home from "./Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Feather, Octicons, Ionicons } from "@expo/vector-icons";
import Cart from "./Cart";
import UserTab from "./UserTab";
import SellerHome from "./SellerHome";
import SellerProducts from "./SellerProducts";
import SellerOrders from "./SellerOrders";

const Tabs = createBottomTabNavigator();
export default function SellerDashboard({ navigation }) {
    // const [focusFunction, setFocusFunction1] = useState(null);
    const stackMoveCallback = (name, object) => {
        navigation.navigate(name, object);
    };

    const pop = () => {
        navigation.pop();
    };

    const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "SellerDashboard" }],
    });

    const resetToTop = () => {
        // console.log("called");
        navigation.dispatch(resetAction);
    };

    let focusFunction = null;
    useFocusEffect(
        React.useCallback(() => {
            // console.log("change", focusFunction);
            if (focusFunction != null) {
                focusFunction();
            }
            return () => null;
        }, [])
    );

    const setFocusFunction = (func) => {
        // console.log("setting", func);
        // setFocusFunction1(func);
        focusFunction = func;
    };

    const deRegisterFocus = () => {
        // console.log("de-register");
        // setFocusFunction1(null);
        focusFunction = null;
    };
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
                        resetToTop: resetToTop,
                    }}
                    options={{
                        tabBarLabel: "Analytics",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="analytics"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="SellerProducts"
                    component={SellerProducts}
                    initialParams={{
                        stackMoveCallback: stackMoveCallback,
                        resetToTop: resetToTop,
                    }}
                    options={{
                        tabBarLabel: "Products",
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="box" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="SellerOrders"
                    component={SellerOrders}
                    initialParams={{
                        stackMoveCallback: stackMoveCallback,
                        resetToTop: resetToTop,
                        setFocusFunction: setFocusFunction,
                        deRegisterFocus: deRegisterFocus,
                    }}
                    options={{
                        tabBarLabel: "Orders",
                        tabBarIcon: ({ color, size }) => (
                            <Octicons
                                name="checklist"
                                size={size}
                                color={color}
                            />
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
