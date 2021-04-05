import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import Home from "./Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Feather, Octicons } from "@expo/vector-icons";
import Cart from "./Cart";
import UserTab from "./UserTab";
import Browse from "./Browse";

const Tabs = createBottomTabNavigator();
export default function UserDashboard({ navigation }) {
    const stackMoveCallback = (name, object) => {
        navigation.navigate(name, object);
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
        focusFunction = func;
    };

    const deRegisterFocus = () => {
        // console.log("de-register");
        focusFunction = null;
    };
    return (
        <NavigationContainer independent={true}>
            <Tabs.Navigator>
                <Tabs.Screen
                    name="Home"
                    component={Home}
                    initialParams={{
                        stackMoveCallback: stackMoveCallback,
                        setFocusFunction: setFocusFunction,
                        deRegisterFocus: deRegisterFocus,
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
                    name="Browse"
                    component={Browse}
                    initialParams={{
                        stackMoveCallback: stackMoveCallback,
                        setFocusFunction: setFocusFunction,
                        deRegisterFocus: deRegisterFocus,
                    }}
                    options={{
                        tabBarLabel: "Browse",
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="box" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
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
                />
            </Tabs.Navigator>
        </NavigationContainer>
    );
}
