import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, div } from "react-native";
import {fetchAllProductsForSubcategory} from '../model/interface';
import ProductView from './ProductView';

export default function ProductsList({navigation, route}) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [display, setDisplay] =  useState("none");
    // values passed as props
    
    let subcategory = route.params;

    if(isLoading) {
        fetchAllProductsForSubcategory(subcategory, (data) => {
            setIsLoading(false);
            setProducts(data);
            if(data.length == 0) {
                setDisplay("flex");
            }
            console.log(products);
        });
    }
    
    const itemClicked = (item) => {
        navigation.navigate("Product Detail", item);
    }   

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Products under {subcategory}</Text>
            <Text style={[{display}]}>No items avaiable under this subcategory</Text>
            <FlatList data={products} renderItem={(product) => <ProductView item={product} clickCallback={itemClicked} />}></FlatList>
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
        fontWeight: "bold"
    },
});