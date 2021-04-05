import React, { useRef, useState } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from "react-native";
import { fetchSubcategoriesImage } from "../model/interface";

const defaultIllustrationUrl = "https://i.imgur.com/UYiroysl.jpg";
const { width: screenWidth } = Dimensions.get("window");

let carouselArray = {};

function getImagesForCarousel(subcategoryArray, categoryName, callback) {
    carouselArray[categoryName] = [];
    fetchSubcategoriesImage(subcategoryArray, (images) => {
        // console.log("images: ", images);
        subcategoryArray.forEach((subcategory, index) => {
            // console.log(subcategory);
            if (images && images[index]) {
                carouselArray[categoryName].push({
                    title: subcategory.label,
                    illustration: images[index],
                });
            } else {
                carouselArray[categoryName].push({
                    title: subcategory.label,
                    illustration: defaultIllustrationUrl,
                });
            }
        });
        callback();
    });
}

export default function CategoryView({ item, clickCallback }) {
    const [entries, setEntries] = useState([]);
    const carouselRef = {};
    let categoryName = item.item.label;
    carouselRef[categoryName] = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const goForward = () => {
        carouselRef[categoryName].current.snapToNext();
    };
    if (isLoading) {
        // console.log("item: ", item);
        getImagesForCarousel(
            item.item.subCategories,
            item.item.label,
            isFetched
        );
    }
    function isFetched() {
        setIsLoading(false);
        setEntries(carouselArray[categoryName]);
    }

    const imageClicked = (subcategoryIndex) => {
        console.log("Click", subcategoryIndex);
        clickCallback(item.item.subCategories[subcategoryIndex.index]);
    };

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => imageClicked({ index })}
            >
                <ParallaxImage
                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goForward}>
                <Text style={styles.categoryHeader}>{categoryName}</Text>
            </TouchableOpacity>
            <Carousel
                ref={carouselRef[categoryName]}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 120,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: "white",
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "contain",
    },
    categoryHeader: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 5,
    },
    title: {
        fontSize: 18,
    },
});
