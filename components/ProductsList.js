import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";
import {fetchAllProductsForSubcategory} from '../model/interface';
import ProductView from './ProductView';
import ProductDetail from './ProductDetail';
export default function ProductsList({navigation}) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // values passed as props
    
    let subcategory = "Men";

    if(isLoading) {
        fetchAllProductsForSubcategory(subcategory, (data) => {
            console.log(data);
            
            
        });
        let product = {name: "Fujifilm Instax Mini 11 Instant Camera - Blush Pink", description: `About this item
    New Auto Exposure – No need to adjust exposure manually, ensuring the best photo no matter the lighting conditions
    One Touch Selfie Mode – Pull to extend the lens and shoot instant photos as close as 35cm to 50cm, with no need for a separate lens attachment
    Selfie Mirror – Built in mirror next to the lens to frame your face for perfect selfies
    Custom Shutter Buttons– Add fun shutter accessories to personalize your camera beyond just colour
    Take Instant Photos – Uses Fujifilm INSTAX Mini Instant color film – sold separately (5.3cm x 8.4cm)`,
    category: "Camera, Photo & Video", subcategory: "Digital Cameras", seller: "Seller", estimatedTime: 3, quantity:100,
    images: ['https://images-na.ssl-images-amazon.com/images/I/71E9fomEc6L._AC_SL1500_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61TssgG0oaL._AC_SL1500_.jpg'], price: "89.00"}
            
            
            setProducts([product]);
            setIsLoading(false);
    }
    
    const itemClicked = (item) => {
        // navigate to product detail screen
        console.log(navigator);
        navigation.navigate(ProductDetail({item}));
    }   

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Products under {subcategory}</Text>
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