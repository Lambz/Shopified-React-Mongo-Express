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
import { Header } from "react-native-elements";
import SearchBar from "react-native-dynamic-search-bar";
import {
    fetchMostSoldProducts,
    fetchAllProducts,
    getRandomProductFromDB,
} from "../model/interface";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { images } from "../Utils";

const { width: screenWidth } = Dimensions.get("window");

export default function Home({ navigation }) {
    const [searchText, setSearchText] = useState("");
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
            // console.log("reply:", reply);
            setEntries(products);
        });
        // console.log(newestProducts);
        fetchAllProducts(newestProducts);
        getRandomProductFromDB((product) => {
            // console.log("randomProduct: ", product);
            setRandomProduct(product);
        });
        setLoading(false);
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        // console.log(typeof item.illustration);
        // let image;
        // if (typeof item.illustration == "number") {
        //     image = item.illustration;
        // } else {
        //     image = { uri: item.illustration };
        // }
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
    const rightComponentClicked = () => {
        console.log("clicked");
    };

    const itemClicked = (product) => {
        console.log(product.name);
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
            <Header
                leftComponent={{ icon: "menu", color: "#fff" }}
                centerComponent={{
                    text: "Shopified",
                    style: {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        width: "150%",
                        marginLeft: 10,
                    },
                }}
                rightComponent={{
                    icon: "logout",
                    color: "#fff",
                    onPress: rightComponentClicked,
                }}
            />
            <SearchBar
                fontColor="#c6c6c6"
                iconColor="#c6c6c6"
                shadowColor="#282828"
                cancelIconColor="#c6c6c6"
                placeholder="Search here"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                onSearchPress={() => console.log("Search Icon is pressed")}
                onClearPress={() => setSearchText("")}
                style={{ marginTop: 10 }}
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
