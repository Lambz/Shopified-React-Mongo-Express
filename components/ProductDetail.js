import React, { useState } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getUserDetails, updateUser } from "../model/interface";
import { codes } from "../model/firebaseHandlers";

const { width: screenWidth } = Dimensions.get("window");

export default function ProductDetail({ navigation, route }) {
    const [product, setProduct] = useState(route.params);
    const [quantity, setQuantity] = useState("1");
    const [isLoading, setLoading] = useState(true);
    const [isDisabled, setDisabled] = useState(true);
    if (isLoading) {
        navigation.setOptions({ title: route.params.name });
        getUserDetails(true, (user) => {
            if (user != null && user != undefined && user != codes.NOT_FOUND) {
                setDisabled(false);
            }
        });
        setLoading(false);
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        console.log("image", item);
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    };

    const generateItems = () => {
        let returnArray = [];
        for (let i = 0; i < 10; i++) {
            returnArray.push({ label: `${i + 1}`, value: `${i + 1}` });
        }
        return returnArray;
    };

    const addToCartClicked = () => {
        let count = parseInt(quantity);
        product.quantity = count;
        getUserDetails(true, (user) => {
            user.cart.push(product);
            updateUser(true, user, () => {
                navigation.goBack();
            });
        });
    };

    const xpressCheckoutClicked = () => {
        navigation.navigate("ContactForBuy", [product]);
    };

    const printError = () => {
        if (isDisabled) {
            return (
                <View style={{ paddingHorizontal: 10 }}>
                    <Text>You need to be logged in to purchase this item</Text>
                </View>
            );
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.headerText}>{product.name}</Text>
                <Text style={styles.category}>
                    <Text style={styles.bold}>Featured in:</Text>{" "}
                    {product.category}, {product.subcategory}
                </Text>
                {/* carousel */}
                <View style={styles.carouselContainer}>
                    <Carousel
                        ref={null}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={product.images}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                    />
                </View>

                <Text style={styles.price}>
                    <Text style={styles.bold}>CN $: </Text>
                    {product.price}
                </Text>
                <Text style={styles.instock}>In Stock</Text>
                <Text style={styles.estimatedTime}>
                    <Text style={styles.bold}>Ships in: </Text>
                    {product.estimatedTime} days
                </Text>

                <View style={styles.dropdownView}>
                    <Text style={styles.quantity}>Quantity</Text>
                    <DropDownPicker
                        items={generateItems()}
                        defaultValue={quantity}
                        containerStyle={{ height: 40 }}
                        style={styles.dropdown}
                        itemStyle={{
                            justifyContent: "flex-start",
                        }}
                        dropDownStyle={{ backgroundColor: "#fafafa" }}
                        onChangeItem={(item) => {
                            console.log("new item", item);
                            setQuantity(item.value);
                        }}
                    />
                </View>
                <TouchableOpacity
                    disabled={isDisabled}
                    style={styles.button}
                    onPress={() => addToCartClicked()}
                >
                    <Text style={styles.buttonsText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={isDisabled}
                    style={styles.button}
                    onPress={() => xpressCheckoutClicked()}
                >
                    <Text style={styles.buttonsText}>Xpress Checkout</Text>
                </TouchableOpacity>
                {printError()}
                <View style={styles.details}>
                    <Text style={[styles.price, styles.bold]}>
                        Product description
                    </Text>
                    <Text style={styles.seller}>{product.description}</Text>
                    <Text style={styles.seller}>
                        <Text style={styles.bold}>Sold By:</Text>{" "}
                        {product.seller}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    Text: {
        margin: 3,
    },
    carouselContainer: {
        flex: 1,
        marginVertical: 10,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold",
    },
    category: {
        color: "darkslategray",
        fontSize: 15,
    },
    bold: {
        fontWeight: "bold",
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: "white",
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
    },
    price: {
        fontSize: 22,
    },
    instock: {
        color: "green",
        fontSize: 18,
    },
    estimatedTime: {
        fontSize: 15,
    },
    button: {
        backgroundColor: "#282828",
        padding: 15,
        justifyContent: "center",
        margin: 5,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    buttonsText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        marginHorizontal: 5,
    },
    quantity: {
        marginVertical: 5,
        fontWeight: "bold",
    },
    dropdown: {
        backgroundColor: "#fafafa",
        padding: 10,
    },
    dropdownView: {
        marginVertical: 10,
        zIndex: 10,
    },
    details: {
        marginVertical: 15,
        marginBottom: 50,
    },
});
