import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
} from "react-native";
import { Header } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { codes } from "../model/firebaseHandlers";
import { getUserDetails } from "../model/interface";
import { Product } from "../model/models";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {ImageBrowser} from "expo"
const { width: screenWidth } = Dimensions.get("window");

export default function AddProuct({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
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

    const addImageHandler = () => {};
    const itemClicked = (index) => {};

    const renderItem = ({ item, index }, parallaxProps) => {
        let image = "";
        if (item.images.length > 0) {
            image = { uri: item.images[0] };
        } else {
            image = images.productPlaceholder;
        }
        return (
            <TouchableOpacity
                onPress={() => itemClicked(index)}
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
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* <Header
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
            /> */}
            <View style={styles.head}>
                <Text style={styles.headText}>Product</Text>
                <TouchableOpacity
                    onPress={addImageHandler}
                    style={styles.bluebtn}
                >
                    <Text style={[styles.headText, { color: "white" }]}>
                        Add Images
                    </Text>
                </TouchableOpacity>
            </View>
            <Carousel
                style={styles.imageCarousel}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={images}
                renderItem={renderItem}
                hasParallaxImages={true}
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
    imageCarousel: {
        flex: 1,
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
});
