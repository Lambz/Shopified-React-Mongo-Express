import React from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";
import { codes } from "../model/firebaseHandlers";

export default function SellerHome({ navigation, route }) {
    const signOutClicked = () => {
        signOut((code) => {
            if (code == codes.LOGOUT_SUCCESS) {
                route.params.popToTop();
            }
        });
    };
    return (
        <View style={styles.container}>
            <Header
                centerComponent={{
                    text: "Shopified Seller",
                    style: {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        width: "150%",
                    },
                }}
                rightComponent={{
                    icon: "logout",
                    color: "#fff",
                    onPress: signOutClicked,
                }}
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
    text: {
        fontSize: 24,
        marginLeft: 10,
    },
});
