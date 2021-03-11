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
import SearchBar from "react-native-dynamic-search-bar";
import SideMenu from "react-native-side-menu";

export default function Home({ navigation }) {
    const [searchText, setSearchText] = useState("");
    return (
        <View>
            <Header
                leftComponent={{ icon: "menu", color: "#fff" }}
                centerComponent={{
                    text: "Shopified",
                    style: {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        width: "150%",
                        marginLeft: 10,
                    },
                }}
                rightComponent={{ icon: "logout", color: "#fff" }}
            />
            <SearchBar
                fontColor="#c6c6c6"
                iconColor="#c6c6c6"
                shadowColor="#282828"
                cancelIconColor="#c6c6c6"
                placeholder="Search here"
                onChangeText={(text) => setSearchText(text)}
                onSearchPress={() => console.log("Search Icon is pressed")}
                onClearPress={() => setSearchText("")}
                style={{ marginTop: 10 }}
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
    searchView: {
        flexDirection: "row",
        backgroundColor: "white",
    },
});
