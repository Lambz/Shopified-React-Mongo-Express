import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";
import Search from "react-native-search-box";
import { mCurrentUser, setCurrentUser, obs } from "../model/firebaseHandlers";

export default function CustomHeader({ login = false }) {
    const [searchText, setSearchText] = useState("");
    const [icon, setIcon] = useState("login");
    const [isLogin, setLogin] = useState(true);
    const [isLoading, setLoading] = useState(true);
    if (isLoading) {
        obs.onChange((value) => {
            if (value) {
                setIcon("logout");
                setLogin(false);
            } else {
                setIcon("login");
                setLogin(true);
            }
        });
        // console.log(obs);
        // setCurrentUser(true);
        // obs.setValue(true);
        setLoading(false);
    }
    // console.log(mCurrentUser);
    // if (isLoading) {
    //     setInterval()
    //     setLoading(false);
    // }
    // const check
    // if (login) {
    //     setIcon("logout");
    //     setLogin(false);
    // } else {
    //     setIcon("login");
    //     setLogin(true);
    // }
    // const [user, setUser] = useState(mCurrentUser);
    // useFocusEffect(
    //     React.useCallback(() => {
    //         // // console.log("loading customer header");
    //         // console.log("user: ", mCurrentUser);
    //         if (mCurrentUser != null) {
    //             setIcon("logout");
    //             setLogin(false);
    //         } else {
    //             setIcon("login");
    //             setLogin(true);
    //         }
    //         return () => {
    //             // route.params.deRegisterFocus();
    //         };
    //     }, [])
    // );
    // setUser(mCurrentUser);
    // console.log(user != null);
    // if (user != null) {
    //     setIcon("logout");
    //     setLogin(false);
    // } else {
    //     setIcon("login");
    //     setLogin(true);
    // }
    const rightComponentClicked = () => {
        if (isLogin) {
            console.log("login");
        } else {
            console.log("logout");
        }
    };
    return (
        <View>
            <Header
                // leftComponent={{ icon: "menu", color: "#fff" }}
                centerComponent={{
                    text: "Shopified",
                    style: {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        width: "150%",
                    },
                }}
                rightComponent={{
                    icon: icon,
                    color: "#fff",
                    onPress: rightComponentClicked,
                }}
            />
            <View
                style={{
                    padding: 10,
                    borderRadius: 8,
                    shadowColor: "#282828",
                    shadowRadius: 14,
                    shadowOpacity: 0.1,
                }}
            >
                <Search
                    placeholder="Search here"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    onSearch={(text) =>
                        console.log("Search Icon is pressed", text)
                    }
                    onClearPress={() => setSearchText("")}
                    backgroundColor="white"
                    titleCancelColor="#c6c6c6"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
