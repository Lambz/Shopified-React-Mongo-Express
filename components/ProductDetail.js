import React, {useState} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const {width: screenWidth} = Dimensions.get('window');

export default function ProductDetail() {
    
    let product = {name: "Fujifilm Instax Mini 11 Instant Camera - Blush Pink", description: `About this item
    New Auto Exposure – No need to adjust exposure manually, ensuring the best photo no matter the lighting conditions
    One Touch Selfie Mode – Pull to extend the lens and shoot instant photos as close as 35cm to 50cm, with no need for a separate lens attachment
    Selfie Mirror – Built in mirror next to the lens to frame your face for perfect selfies
    Custom Shutter Buttons– Add fun shutter accessories to personalize your camera beyond just colour
    Take Instant Photos – Uses Fujifilm INSTAX Mini Instant color film – sold separately (5.3cm x 8.4cm)`,
    category: "Camera, Photo & Video", subcategory: "Digital Cameras", seller: "Seller", estimatedTime: 3, quantity:100,
    images: ['https://images-na.ssl-images-amazon.com/images/I/71E9fomEc6L._AC_SL1500_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61TssgG0oaL._AC_SL1500_.jpg'], price: "89.00"}
    
    const [quantity, setQuantity] = useState('1');


    const renderItem = ({item, index}, parallaxProps) => {
        console.log("image",item);
        return (
            <View style={styles.item}>
              <ParallaxImage
                source={{uri: item}}
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
        for(let i = 0; i< 10; i++) {
            returnArray.push({label: `${i+1}`, value: `${i+1}`});
        }
        return returnArray;
    };

    const addToCartClicked = () => {
        console.log(quantity);
    };

    const xpressCheckoutClicked = () => {
        console.log(quantity);
    };

    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.headerText}>{product.name}</Text>
            <Text style={styles.category}><Text style={styles.bold}>Featured in:</Text> {product.category}, {product.subcategory}</Text>
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

            <Text style={styles.price}><Text style={styles.bold}>CN $: </Text>{product.price}</Text>
            <Text style={styles.instock}>In Stock</Text>
            <Text style={styles.estimatedTime}><Text style={styles.bold}>Ships in: </Text>{product.estimatedTime} days</Text>
            
            <View style={styles.dropdownView}>
                <Text style={styles.quantity}>Quantity</Text>
                <DropDownPicker
                    items={generateItems()}
                    defaultValue={quantity}
                    containerStyle={{height: 40}}
                    style={styles.dropdown}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => {
                        console.log("new item", item);
                        setQuantity(item.value);
                    }}
                />
                </View>
            <TouchableOpacity style={styles.button} onPress={() => addToCartClicked()}>
                <Text style={styles.buttonsText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => xpressCheckoutClicked()}>
                <Text style={styles.buttonsText}>Xpress Checkout</Text>
            </TouchableOpacity>
            <Text style={styles.seller}><Text style={styles.bold}>Sold By:</Text> {product.seller}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    Text: {
        margin: 3
    },
    carouselContainer: {
        flex: 1,
        marginVertical: 10
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold"
    },
    category: {
        color: 'darkslategray',
        fontSize: 15
    },
    bold: {
        fontWeight: "bold"
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    price: {
        fontSize: 22
    },
    instock: {
        color: 'green',
        fontSize: 18
    },
    estimatedTime: {
        fontSize: 15
    },
    button: {
        backgroundColor: 'darkslateblue',
        padding: 15,
        justifyContent: "center",
        margin: 5,
        marginHorizontal: 20,
        borderRadius: 5
    },
    buttonsText: {
        color: 'white',
        textAlign: "center",
        fontSize: 20,
        marginHorizontal: 5
    },
    quantity: {
        marginVertical: 5,
        fontWeight: "bold"
    },
    dropdown: {
        backgroundColor: '#fafafa',
        padding: 10
    },
    dropdownView: {
        marginVertical: 10,
        zIndex: 10
    }
});