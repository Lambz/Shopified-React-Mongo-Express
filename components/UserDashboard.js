import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SellerSignUp from "./SellerSignUp";
import SellerLogin from "./SellerLogin";
import Home from "./Home";

const Tabs = createBottomTabNavigator();
export default function UserDashboard({ navigation }) {
    return (
        <NavigationContainer independent={true}>
            <Tabs.Navigator>
                {/* <Tabs.Screen name="1" component={SellerLogin} />
                <Tabs.Screen name="2" component={SellerSignUp} /> */}
                <Tabs.Screen name="Home" component={Home} />
            </Tabs.Navigator>
        </NavigationContainer>
    );
}
