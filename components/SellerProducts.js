import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { Header } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { codes } from "../model/firebaseHandlers";
import { getUserDetails } from "../model/interface";
import { Product } from "../model/models";

export default function SellerProducts({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    if (isLoading) {
        getUserDetails(false, (seller) => {
            console.log("Seller: ", seller);
            if (seller != null && seller != codes.NOT_FOUND) {
                setProducts(seller.products);
            }
        });
        setLoading(false);
    }
    const signOutClicked = () => {
        signOut((code) => {
            if (code == codes.LOGOUT_SUCCESS) {
                route.params.popToTop();
            }
        });
    };
    const productClicked = (product) => {
        console.log(product.name, " clicked!");
    };
    return (
        <View style={styles.container}>
            <Header
                centerComponent={{
                    text: "Shopified Seller",
                    style: {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        width: "150%",
                    },
                }}
                rightComponent={{
                    icon: "logout",
                    color: "#fff",
                    onPress: signOutClicked,
                }}
            />
            <View style={styles.head}>
                <Text style={styles.headText}>Products</Text>
                <TouchableOpacity style={styles.bluebtn}>
                    <Text style={[styles.headText, { color: "white" }]}>
                        Add Product
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.flatlist}
                data={products}
                renderItem={({ item }) => (
                    <ProductItem item={item} productClicked={productClicked} />
                )}
                keyExtractor={(item) => item.id}
                extraData={products.length}
                refreshControl={
                    <RefreshControl
                        onRefresh={() => {
                            loadData();
                        }}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 20,
    },
    text: {
        fontSize: 24,
        marginLeft: 10,
    },
    head: {
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headText: {
        fontSize: 24,
    },
    bluebtn: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#4089d6",
        borderRadius: 4,
    },
});
