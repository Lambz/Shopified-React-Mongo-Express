import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SellerSignUp from "./SellerSignUp";
import SellerLogin from "./SellerLogin";
import Home from "./Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Cart from "./Cart";

const Tabs = createBottomTabNavigator();
export default function UserDashboard({ navigation }) {
    return (
        <NavigationContainer independent={true}>
            <Tabs.Navigator>
                {/* <Tabs.Screen name="1" component={SellerLogin} />
                <Tabs.Screen name="2" component={SellerSignUp} /> */}
                <Tabs.Screen
                    name="Home"
                    component={Home}
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
                    name="Cart"
                    component={Cart}
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
            </Tabs.Navigator>
        </NavigationContainer>
    );
}
