import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";
import { codes } from "../model/firebaseHandlers";
import * as Crypto from "expo-crypto";
import { signIn } from "../model/interface";

export default function SellerHome({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    if (isLoading) {
        // (async () => {
        //     const digest = await Crypto.digestStringAsync(
        //         Crypto.CryptoDigestAlgorithm.SHA512,
        //         "test123"
        //     );
        //     signIn("c@gmail.com", digest, false, (user) => {
        //         if (user != codes.NOT_FOUND) {
        //             console.log("login success");
        //         } else {
        //             Alert.alert(
        //                 "Invalid Login!",
        //                 "Email or password does not exist.",
        //                 [
        //                     {
        //                         text: "Okay",
        //                         onPress: () => console.log("OK Pressed"),
        //                     },
        //                 ]
        //             );
        //         }
        //     });
        // })();
        setLoading(false);
    }
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
