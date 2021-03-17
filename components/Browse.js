import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";
import CategoryView from './CategoryView';
import {fetchAllCategoriesAndSubcategories, fetchOrdersForSeller} from '../model/interface';

export default function Browse({navigation}) {
    const [categories, setCategories] = useState([{name: "Electronics", subcategories: ["TV", "Laptop", "Headphone"] },
    {name: "Clothes", subcategories: ["Men", "Women", "Children"] }]);
    const [isLoading, setIsLoading] = useState(true);
    if(isLoading) {
        fetchAllCategoriesAndSubcategories((data) => {
            setCategories(data);
            setIsLoading(false);
        })
    }
    
    const subcategoryClicked = (subcategory) => {
        console.log("subcategory fetched", subcategory);
        navigation.navigate("Products List", subcategory);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Browse</Text>
            <FlatList data={categories} renderItem={(category) => <CategoryView item={category} clickCallback={subcategoryClicked}/>}></FlatList>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold"
    }
});