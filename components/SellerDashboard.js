import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SellerSignUp from "./SellerSignUp";
import SellerLogin from "./SellerLogin";

const Tabs = createBottomTabNavigator();
export default function SellerDashboard({ navigation }) {
    return (
        <NavigationContainer independent={true}>
            <Tabs.Navigator>
                <Tabs.Screen name="1" component={SellerLogin} />
                <Tabs.Screen name="2" component={SellerSignUp} />
            </Tabs.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        backgroundColor: "white",
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    margin: {
        marginTop: 10,
    },
    text: { fontSize: 24, padding: 5 },
    btn: {
        width: 200,
        backgroundColor: "#007AFF",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        color: "white",
        borderRadius: 8,
    },
    width: {
        width: "100%",
    },
});
