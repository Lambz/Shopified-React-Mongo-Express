import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";
import Search from "react-native-search-box";
import { mCurrentUser, setCurrentUser, obs } from "../model/firebaseHandlers";

export default function CustomHeader({ loginFunc, logoutFunc, searchFunc }) {
    const [searchText, setSearchText] = useState("");
    const [icon, setIcon] = useState("login");
    const [isLogin, setLogin] = useState(true);
    const changed = (value) => {
        if (value) {
            setIcon("logout");
            setLogin(false);
        } else {
            setIcon("login");
            setLogin(true);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            if (obs.getValue() != null && obs.getValue() != undefined) {
                setIcon("logout");
                setLogin(false);
            } else {
                setIcon("login");
                setLogin(true);
            }
            obs.onChange(changed);
            return () => {
                // route.params.deRegisterFocus();
            };
        }, [])
    );
    const rightComponentClicked = () => {
        if (isLogin) {
            console.log("login");
            loginFunc();
        } else {
            console.log("logout");
            logoutFunc();
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
                    placeholder="Search Products"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    onSearch={(text) => searchFunc(text)}
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
