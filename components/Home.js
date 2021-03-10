import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";
import { Header } from "react-native-elements";

export default function Home({ navigation }) {
    return (
        <View>
            <Header
                leftComponent={{ icon: "menu", color: "#fff" }}
                centerComponent={{
                    text: "MY TITLE",
                    style: { color: "#fff" },
                }}
                rightComponent={{ icon: "home", color: "#fff" }}
            />
        </View>
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
});
