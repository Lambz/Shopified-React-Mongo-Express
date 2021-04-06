import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
    FlatList,
    Alert,
} from "react-native";
import { codes, mUserUid } from "../model/expressHandler";
import {
    deleteProduct,
    fetchAllCategoriesAndSubcategories,
    getUserDetails,
    insertImage,
    insertProduct,
    signIn,
} from "../model/interface";
import { Product } from "../model/models";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import * as ImagePicker from "expo-image-picker";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";
import { generateID, uriToBlob } from "../Utils";
import * as Crypto from "expo-crypto";
const { width: screenWidth } = Dimensions.get("window");

export default function AddProuct({ navigation, route }) {
    // console.log(route.params);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [est, setEst] = useState("");
    const [selectedCatgeory, setSelectedCategory] = useState("");
    const [selectedSubCatgeory, setSelectedSubCategory] = useState("");
    const [nameBorder, setNameBorder] = useState("#eeeeee");
    const [priceBorder, setPriceBorder] = useState("#eeeeee");
    const [quantiyBorder, setQuantiyBorder] = useState("#eeeeee");
    const [descriptionBorder, setDescriptBorder] = useState("#eeeeee");
    const [estBorder, setEstBorder] = useState("#eeeeee");
    const [selectedCategoryBorder, setSelectedCategoryBorder] = useState(
        "#eeeeee"
    );
    const [selectedSubCategoryBorder, setSelectedSubCategoryBorder] = useState(
        "#eeeeee"
    );
    const [isLoading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [newProduct, setNewProduct] = useState(true);
    // const [categoryData, setCategoryData] = useState(null);
    const [seller, setSeller] = useState(null);
    const [defaultCategory, setDefaultCategory] = useState();
    const [defaultSubCategory, setDefaultSubCategory] = useState();
    const [product, setProduct] = useState(null);
    const [posButton, setPosButton] = useState("Add Product");
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    if (isLoading) {
        console.log(route.params.seller);
        setSeller(route.params.seller);
        let c;
        fetchAllCategoriesAndSubcategories((categories) => {
            setCategories(categories);
            let sc = categories[0].subCategories;
            setSubCategories(sc);
        });
        if (route.params.product != null && route.params.product != undefined) {
            let product = route.params.product;
            navigation.setOptions({ title: "Edit Product" });
            setPosButton("Save");
            setNewProduct(false);
            setName(product.name);
            setPrice(Number(product.price));
            setQuantity(Number(product.quantity));
            setDescription(product.description);
            setEst(Number(product.estimatedTime));
            setImages(product.images);
            setProduct(product);
            setTimeout(() => {
                setDefaultCategory(product.category);
                setSelectedCategory(product.category);
                // console.log(c);
                for (let i = 0; i < c.length; i++) {
                    // console.log(c[i].name, product.category);
                    if (c[i].name == product.category) {
                        let data = [];
                        c[i].subcategories.forEach((s) => {
                            data.push({ label: s, value: s });
                        });
                        setSubCategories(data);
                        break;
                    }
                }
                setDefaultSubCategory(product.subcategory);
                setSelectedSubCategory(product.subcategory);
                // setTimeout(() => {
                //     setDefaultSubCategory(product.subcategory);
                //     setSelectedSubCategory(product.subcategory);
                // }, 1500);
            }, 1500);
        }
        setLoading(false);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setImages((allImages) => {
            return [result.uri, ...allImages];
        });
    };

    const addImageHandler = () => {
        pickImage();
    };
    const itemClicked = (index) => {};
    const longPressClicked = (index) => {
        Alert.alert("Delete Image", "Do you want to delete this Image?", [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
            {
                text: "Delete",
                onPress: () => {
                    setImages((allImages) => {
                        allImages.splice(index, 1);
                        return allImages;
                    });
                },
                style: "destructive",
            },
        ]);
    };

    const renderItem = ({ item, index }, parallaxProps) => {
        let image = "";
        if (item != null) {
            image = { uri: item };
        } else {
            image = images.productPlaceholder;
        }
        // console.log(image);
        return (
            <TouchableOpacity
                onPress={() => itemClicked(index)}
                activeOpacity={0.6}
                style={styles.item}
                onLongPress={() => longPressClicked(index)}
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

    const productResult = (reply) => {
        if (reply == codes.INSERTION_SUCCESS) {
            Alert.alert(
                "Product Added!",
                "Your Product has been successfully added.",
                [
                    {
                        text: "Okay",
                        onPress: () => navigation.pop(),
                    },
                ]
            );
        }
    };

    const addHandler = () => {
        let noProb = true;
        if (name == "") {
            noProb = false;
            setNameBorder("#f00");
        }
        if (selectedCatgeory == "") {
            noProb = false;
            setSelectedCategoryBorder("#f00");
        }
        if (selectedSubCatgeory == "") {
            noProb = false;
            setSelectedSubCategoryBorder("#f00");
        }
        if (price == "") {
            noProb = false;
            setPriceBorder("#f00");
        }
        if (quantity == "") {
            noProb = false;
            setQuantiyBorder("#f00");
        }
        if (description == "") {
            noProb = false;
            setDescriptBorder("#f00");
        }
        if (est == "") {
            noProb = false;
            setEstBorder("#f00");
        }
        if (noProb) {
            let uid = mUserUid;
            let p;
            if (newProduct) {
                // p = new Product(
                //     name,
                //     generateID(30),
                //     selectedCatgeory,
                //     selectedSubCatgeory,
                //     price,
                //     seller.company,
                //     uid,
                //     est,
                //     [],
                //     quantity,
                //     description
                // );
                p = {
                    name: name,
                    category: selectedCatgeory,
                    subcategory: selectedSubCatgeory,
                    price: price,
                    seller: seller._id,
                    estimatedTime: est,
                    images: [],
                    quantity: quantity,
                    description: description,
                };
            } else {
                p = product;
                console.log(product);
                p.name = name;
                p.category = selectedCatgeory;
                p.subcategory = selectedSubCatgeory;
                p.price = price;
                p.seller = seller.company;
                p.seller_id = uid;
                p.estimatedTime = est;
                p.images = [];
                p.quantity = quantity;
                p.description = description;
            }
            if (images.length > 0) {
                let newImages = [];
                let oldImages = [];
                images.forEach((image) => {
                    // if (typeof image == "object") {
                    //     newImages.push(image);
                    // } else {
                    //     oldImages.push(image);
                    // }
                    if (image.includes("firebasestorage")) {
                        oldImages.push(image);
                    } else {
                        newImages.push(image);
                    }
                });
                // console.log("newImages: ", newImages);
                // console.log("oldImages: ", oldImages);
                if (newImages.length > 0) {
                    let blobs = [];
                    let num = newImages.length;
                    let count = 1;
                    const handleRequest = (response) => {
                        blobs.push(response);
                        if (count == num) {
                            insertImage(p.id, blobs, (urls) => {
                                p.images = oldImages.concat(urls);
                                insertProduct(p, seller, false, productResult);
                            });
                        }
                        num++;
                    };
                    for (let i = 0; i < num; i++) {
                        uriToBlob(newImages[i])
                            .then(handleRequest)
                            .catch((reply) => {
                                console.log(reply);
                            });
                    }
                } else {
                    p.images = oldImages;
                    insertProduct(p, seller, false, productResult);
                }
            } else {
                insertProduct(p, seller, false, productResult);
            }
        } else {
            Alert.alert("Inavlid Input!", "One or more inputs are invalid", [
                {
                    text: "Okay",
                    onPress: () => console.log("okay Pressed"),
                },
            ]);
        }
    };

    const updateSelectedCategory = (category) => {
        setSelectedCategory(category._id);
        setSubCategories(category.subCategories);
    };

    const deleteHandler = () => {
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "Delete",
                    onPress: () => {
                        deleteProduct(product.id, seller, (reply) => {
                            if (reply == codes.INSERTION_SUCCESS) {
                                navigation.pop();
                            }
                        });
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const displayDeleteButton = () => {
        if (!newProduct) {
            return (
                <TouchableOpacity
                    onPress={deleteHandler}
                    style={[styles.redbtn, { marginBottom: 40 }]}
                >
                    <Text
                        style={[
                            styles.text,
                            { color: "white", textAlign: "center" },
                        ]}
                    >
                        Delete Product
                    </Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.headText}>Images</Text>
                <TouchableOpacity
                    onPress={addImageHandler}
                    style={styles.bluebtn}
                >
                    <Text style={[styles.headText, { color: "white" }]}>
                        Add Images
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Carousel
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 60}
                    data={images}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                    extraData={images}
                />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ marginTop: 20 }}>Name</Text>
                <TextInput
                    onChangeText={(text) => setName(text)}
                    style={[styles.input, { borderColor: nameBorder }]}
                    placeholder="Name"
                    value={name}
                />
                <Text style={{ marginTop: 20 }}>Category</Text>
                <DropDownPicker
                    items={categories}
                    containerStyle={{
                        height: 40,
                        marginTop: 5,
                        borderColor: selectedCategoryBorder,
                        zIndex: 10000,
                    }}
                    style={{ backgroundColor: "#fafafa", zIndex: 10 }}
                    itemStyle={{
                        justifyContent: "flex-start",
                        zIndex: 10000,
                    }}
                    dropDownStyle={{
                        backgroundColor: "#fafafa",
                        zIndex: 10000,
                    }}
                    onChangeItem={(item) => updateSelectedCategory(item)}
                    zIndex={10000}
                    defaultValue={defaultCategory}
                />
                <Text style={{ marginTop: 20 }}>Sub-Category</Text>
                <DropDownPicker
                    items={subCategories}
                    containerStyle={{
                        height: 40,
                        marginTop: 5,
                        borderColor: selectedSubCategoryBorder,
                        zIndex: 1,
                    }}
                    style={{ backgroundColor: "#fafafa", zIndex: 9 }}
                    itemStyle={{
                        justifyContent: "flex-start",
                        zIndex: 1,
                    }}
                    dropDownStyle={{ backgroundColor: "#fafafa", zIndex: 1 }}
                    onChangeItem={(item) => setSelectedSubCategory(item._id)}
                    defaultValue={defaultSubCategory}
                />
                <Text style={{ marginTop: 20 }}>Price</Text>
                <TextInput
                    onChangeText={(text) => setPrice(Number(text))}
                    style={[styles.input, { borderColor: priceBorder }]}
                    placeholder="Price"
                    keyboardType="numeric"
                    value={String(price)}
                />
                <Text style={{ marginTop: 20 }}>Quantity</Text>
                <TextInput
                    onChangeText={(text) => setQuantity(Number(text))}
                    style={[styles.input, { borderColor: quantiyBorder }]}
                    placeholder="Quantity"
                    keyboardType="numeric"
                    value={String(quantity)}
                />
                <Text style={{ marginTop: 20 }}>Description</Text>
                <TextInput
                    onChangeText={(text) => setDescription(text)}
                    style={[styles.input, { borderColor: descriptionBorder }]}
                    placeholder="Description"
                    multiline={true}
                    value={description}
                />
                <Text style={{ marginTop: 20 }}>Estimated Shipping Time</Text>
                <TextInput
                    onChangeText={(text) => setEst(Number(text))}
                    style={[styles.input, { borderColor: estBorder }]}
                    placeholder="Time in Days"
                    keyboardType="numeric"
                    value={String(est)}
                />
                <TouchableOpacity
                    onPress={addHandler}
                    style={[
                        styles.bluebtn,
                        { marginTop: 20, marginBottom: 20 },
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            { color: "white", textAlign: "center" },
                        ]}
                    >
                        {posButton}
                    </Text>
                </TouchableOpacity>
                {displayDeleteButton()}
            </View>
        </ScrollView>
    );
}

// [
//     {
//         label: "USA",
//         value: "usa",
//         icon: () => (
//             <Icon name="flag" size={18} color="#900" />
//         ),
//         hidden: false,
//     },
//     {
//         label: "UK",
//         value: "uk",
//         icon: () => (
//             <Icon name="flag" size={18} color="#900" />
//         ),
//     },
//     {
//         label: "France",
//         value: "france",
//         // icon: () => (
//         //     <Icon name="flag" size={18} color="#900" />
//         // ),
//     },
// ]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
        backgroundColor: "#222222",
        borderRadius: 8,
    },
    input: {
        fontSize: 24,
        backgroundColor: "#f7f7f7",
        padding: 5,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 5,
    },
    redbtn: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#c70000",
        borderRadius: 4,
    },
});
