import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";
import { Header, SearchBar } from "react-native-elements";

export default function Home({ navigation }) {
    const [searchText, setSearchText] = useState("");
    return (
        <View>
            <Header
                leftComponent={{
                    text: "Shopified",
                    style: {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        width: "150%",
                    },
                }}
                // centerComponent={{
                //     text: "MY TITLE",
                //     style: { color: "#fff" },
                // }}
                rightComponent={{ icon: "logout", color: "#fff" }}
            />
            <View style={styles.searchView}>
                <SearchBar
                    placeholder="Search text"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    lightTheme
                    round
                    editable={true}
                    showCancel
                    style={{ backgroundColor: "white" }}
                    color="#fff"
                />
                <Button title="Search" />
            </View>
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
