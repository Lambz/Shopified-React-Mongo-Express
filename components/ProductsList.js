import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, div } from "react-native";
import {
    fetchAllProductsForSubcategory,
    fetchAllProducts,
    searchProducts,
} from "../model/interface";
import ProductView from "./ProductView";

export default function ProductsList({ navigation, route }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [display, setDisplay] = useState("none");
    const [dispayText, setDisplayText] = useState("");

    if (isLoading) {
        if (route.params.browse) {
            fetchAllProductsForSubcategory(route.params.browse, (data) => {
                console.log(data);
                setDisplayText(route.params.browse.label);
                setProducts(data);
                if (data.length == 0) {
                    setDisplay("flex");
                }
                // console.log(products);
            });
        } else {
            searchProducts(route.params.searchText, (products) => {
                console.log("resposne: ", products);
                setProducts(products);
            });
        }
        setIsLoading(false);
    }

    const itemClicked = (item) => {
        navigation.navigate("Product Detail", item);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Products for {dispayText}</Text>
            <Text style={[{ display }]}>
                No items available under this subcategory
            </Text>
            <FlatList
                data={products}
                renderItem={(product) => (
                    <ProductView item={product} clickCallback={itemClicked} />
                )}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold",
    },
});
