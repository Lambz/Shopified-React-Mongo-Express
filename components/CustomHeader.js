import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";
import Search from "react-native-search-box";

export default function CustomHeader() {
    const [searchText, setSearchText] = useState("");
    const rightComponentClicked = () => {
        console.log("clicked");
    };
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
                rightComponent={{
                    icon: "logout",
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
