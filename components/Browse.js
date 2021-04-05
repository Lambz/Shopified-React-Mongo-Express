import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CategoryView from "./CategoryView";
import {
    fetchAllCategoriesAndSubcategories,
    signOut,
} from "../model/interface";
import CustomHeader from "./CustomHeader";

export default function Browse({ navigation, route }) {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        fetchAllCategoriesAndSubcategories((data) => {
            setCategories(data);
            setIsLoading(false);
        });
    }

    const subcategoryClicked = (subcategory) => {
        // console.log("subcategory fetched", subcategory);
        route.params.stackMoveCallback("Products List", {
            browse: subcategory,
        });
    };

    const loginFunc = () => {
        route.params.stackMoveCallback("SignInScreen");
    };

    const logoutFunc = () => {
        signOut(() => {
            console.log("logged out");
        });
    };

    const searchFunc = (text) => {
        console.log(text);
        route.params.stackMoveCallback("Products List", { searchText: text });
    };

    return (
        <View style={styles.container}>
            <CustomHeader
                loginFunc={loginFunc}
                logoutFunc={logoutFunc}
                searchFunc={searchFunc}
            />
            <Text style={styles.headerText}>Browse</Text>
            <FlatList
                style={{ padding: 5 }}
                data={categories}
                renderItem={(category) => (
                    <CategoryView
                        item={category}
                        clickCallback={subcategoryClicked}
                    />
                )}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        padding: 5,
    },
});
