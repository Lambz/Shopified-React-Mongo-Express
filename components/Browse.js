import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";
import CategoryView from './CategoryView';

export default function Browse() {
    const [categories, setCategories] = useState([{name: "Electronics", subcategories: ["TV", "Laptop", "Headphone"] },
    {name: "Clothes", subcategories: ["Men", "Women", "Children"] }]);


    function addCategories() {
        setCategories([]);
    }
    
    console.log(categories);
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