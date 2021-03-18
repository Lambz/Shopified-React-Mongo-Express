import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, div } from "react-native";
import {fetchAllProductsForSubcategory, fetchAllProducts} from '../model/interface';
import ProductView from './ProductView';

export default function ProductsList({navigation, route}) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [display, setDisplay] =  useState("none");
    const [dispayText, setDisplayText] = useState('');
    // values passed as props
    
    if(route.params.browse) {
        if(isLoading) {
            
            fetchAllProductsForSubcategory(route.params.browse, (data) => {
                setIsLoading(false);
                setDisplayText(route.params.browse);
                setProducts(data);
                if(data.length == 0) {
                    setDisplay("flex");
                }
                console.log(products);
            });
        } 
    }
    else {
        if(isLoading) {
            if(route.params.searchText) {
                
                let regex = new RegExp(route.params.searchText, "i");
                let productArray = [];
                fetchAllProducts((data) => {
                    setIsLoading(false);
                    setDisplayText(route.params.searchText);
                    if(data.length == 0) {
                        setDisplay("flex");
                    }
                    data.forEach((item) => {
                        if(item.name.search(regex) !== -1) {
                            productArray.push(item);
                        }
                    })
                    setProducts(productArray);
                })
            }
        }
    
    }

   
    
    const itemClicked = (item) => {
        navigation.navigate("Product Detail", item);
    }   

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Products for {dispayText}</Text>
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