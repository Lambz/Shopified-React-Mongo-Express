import React, { useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
    Dimensions,
    ScrollView,
    Image,
} from "react-native";
import {
    fetchMostSoldProducts,
    fetchAllProducts,
    getRandomProductFromDB,
    signIn,
    getUserDetails,
    signOut,
} from "../model/interface";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { images } from "../Utils";
import CustomHeader from "./CustomHeader";
import * as Crypto from "expo-crypto";

const { width: screenWidth } = Dimensions.get("window");

export default function Home({ navigation, route }) {
    const [entries, setEntries] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [randomProduct, setRandomProduct] = useState(null);
    const newestProducts = (products) => {
        products.splice(6);
        setNewArrivals(products);
    };
    if (isLoading) {
        fetchMostSoldProducts((products) => {
            setEntries(products);
        });
        fetchAllProducts(newestProducts);
        getRandomProductFromDB((product) => {
            setRandomProduct(product);
        });
        getUserDetails(true, () => {});
        setLoading(false);
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        let image = "";
        if (item.images.length > 0) {
            image = { uri: item.images[0] };
        } else {
            image = images.productPlaceholder;
        }
        return (
            <TouchableOpacity
                onPress={() => itemClicked(item)}
                activeOpacity={0.6}
                style={styles.item}
            >
                <ParallaxImage
                    source={image}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={styles.subtitle} numberOfLines={2}>
                        $ {item.price}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const itemClicked = (product) => {
        route.params.stackMoveCallback("Product Detail", product);
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
        route.params.stackMoveCallback("Products List", { searchText: text });
    };

    const renderRandomProduct = () => {
        if (randomProduct) {
            let image = "";
            if (randomProduct.images.length > 0) {
                image = { uri: randomProduct.images[0] };
            } else {
                image = images.productPlaceholder;
            }
            // console.log("image:", image);
            return (
                <View>
                    <Text style={styles.heading}>Random Product</Text>
                    <TouchableOpacity
                        onPress={() => itemClicked(randomProduct)}
                        activeOpacity={0.6}
                        style={{ alignItems: "center" }}
                    >
                        <Image
                            source={image}
                            style={{
                                height: screenWidth - 60,
                                width: screenWidth - 60,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            }}
                        />
                        <View
                            style={[
                                styles.info,
                                {
                                    backgroundColor: "#222222",
                                    borderBottomRightRadius: 8,
                                    borderBottomLeftRadius: 8,
                                },
                            ]}
                        >
                            <Text style={styles.title} numberOfLines={1}>
                                {randomProduct.name}
                            </Text>
                            <Text style={styles.subtitle} numberOfLines={2}>
                                $ {randomProduct.price}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    };
    return (
        <View style={styles.container}>
            <CustomHeader
                loginFunc={loginFunc}
                logoutFunc={logoutFunc}
                searchFunc={searchFunc}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.heading}>New Arrivals</Text>
                    <Carousel
                        style={styles.imageCarousel}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={newArrivals}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                    />
                </View>
                <View>
                    <Text style={styles.heading}>Latest Products</Text>
                    <Carousel
                        style={styles.imageCarousel}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={entries}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                    />
                </View>
                {renderRandomProduct()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 20,
    },
    searchView: {
        flexDirection: "row",
        backgroundColor: "white",
    },
    imageCarousel: {
        flex: 1,
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
        backgroundColor: "#222222",
        borderRadius: 8,
    },
    info: { padding: 15 },
    title: {
        color: "white",
        fontWeight: "bold",
    },
    subtitle: {
        color: "#dddddd",
        marginTop: 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: "white",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
    },
    heading: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10,
    },
});
