import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";
import CategoryView from './CategoryView';
import {fetchAllCategoriesAndSubcategories} from '../model/interface';

export default function Browse() {
    const [categories, setCategories] = useState([{name: "Electronics", subcategories: ["TV", "Laptop", "Headphone"] },
    {name: "Clothes", subcategories: ["Men", "Women", "Children"] }]);

    function getCategoriesObjects() {
        fetchAllCategoriesAndSubcategories((data) => {
            setCategories(data);
        })
    }
   
    useEffect(() => {
        getCategoriesObjects();
    }, [])
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Browse</Text>
            <FlatList data={categories} renderItem={(category) => <CategoryView item={category}/>}></FlatList>
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