import React, { useRef, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ButtonGroup, Header } from "react-native-elements";
import {
    deleteCategory,
    deleteSubCategory,
    fetchAllCategoriesAndSubcategories,
    updateCategory,
    updateSubCategory,
} from "../model/interface";
import { Feather } from "@expo/vector-icons";
import { RefreshControl } from "react-native";
import { Alert } from "react-native";

export default function Categories({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    if (isLoading) {
        fetchAllCategoriesAndSubcategories((categories) => {
            // console.log(categories);
            setCategories(categories);
            if (selectedCategory != null) {
                let sc = null;
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i]._id == selectedCategory._id) {
                        sc = categories[i].subCategories;
                    }
                    if (sc != null) {
                        setSubCategories(sc);
                    }
                }
            }
        });
        setLoading(false);
    }

    const categorySelectedHandler = (item) => {
        setSelectedCategory(item);
        setSubCategories(item.subCategories);
    };

    const categoryEditHandler = () => {
        Alert.prompt(
            "New Name",
            "Please enter the category name",
            [
                {
                    text: "Save",
                    onPress: (value) =>
                        updateCategory(selectedCategory, value, (data) => {
                            // setSelectedCategory(null);
                            setSelectedCategory((category) => {
                                category.label = value;
                                category.value = value;
                                return category;
                            });
                            categorySelectedHandler(selectedCategory);
                            setLoading(true);
                        }),
                },
                { text: "Cancel", style: "cancel" },
            ],
            "plain-text",
            selectedCategory.label
        );
    };

    const categoryDeleteHandler = () => {
        Alert.alert("Delete Category", "Are you sure?", [
            {
                text: "Delete",
                onPress: () =>
                    deleteCategory(selectedCategory, (data) =>
                        setLoading(true)
                    ),
                style: "destructive",
            },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const displayCategory = () => {
        if (selectedCategory != null) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                        borderBottomColor: "#dddddd",
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                    }}
                >
                    <Text>{selectedCategory.label}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <TouchableOpacity onPress={categoryEditHandler}>
                            <Feather name="edit-2" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={categoryDeleteHandler}>
                            <Feather
                                name="trash-2"
                                size={24}
                                color="red"
                                style={{ marginHorizontal: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    const subCategoryEditHandler = (item) => {
        Alert.prompt(
            "New Name",
            "Please enter the sub-category name",
            [
                {
                    text: "Save",
                    onPress: (value) =>
                        updateSubCategory(item, value, (data) => {
                            // setSelectedCategory(null);
                            // setSelectedCategory((category) => {
                            //     category.label = value;
                            //     category.value = value;
                            //     return category;
                            // });
                            // categorySelectedHandler(selectedCategory);
                            setLoading(true);
                        }),
                },
                { text: "Cancel", style: "cancel" },
            ],
            "plain-text",
            item.label
        );
    };

    const subCategoryDeleteHandler = (item) => {
        Alert.alert("Delete Sub-Category", "Are you sure?", [
            {
                text: "Delete",
                onPress: () =>
                    deleteSubCategory(item, (data) => setLoading(true)),
                style: "destructive",
            },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const renderSubCategory = (item) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                    borderBottomColor: "#dddddd",
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                }}
            >
                <Text>{item.label}</Text>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => subCategoryEditHandler(item)}
                    >
                        <Feather name="edit-2" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => subCategoryDeleteHandler(item)}
                    >
                        <Feather
                            name="trash-2"
                            size={24}
                            color="red"
                            style={{ marginHorizontal: 10 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
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
                    // onPress: signOutClicked,
                }}
            />
            <View style={{ flex: 1, padding: 10 }}>
                <DropDownPicker
                    items={categories}
                    containerStyle={{
                        height: 40,
                        marginTop: 5,
                        zIndex: 1,
                    }}
                    style={{ backgroundColor: "#fafafa", zIndex: 9 }}
                    itemStyle={{
                        justifyContent: "flex-start",
                        zIndex: 1,
                    }}
                    dropDownStyle={{ backgroundColor: "#fafafa", zIndex: 1 }}
                    onChangeItem={categorySelectedHandler}
                    // defaultValue={defaultSubCategory}
                />
                {displayCategory()}
                <FlatList
                    style={styles.flatlist}
                    data={subCategories}
                    renderItem={({ item }) => renderSubCategory(item)}
                    keyExtractor={(item) => item._id}
                    // extraData={products.length}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => {
                                setLoading(true);
                            }}
                        />
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageCarousel: {
        flex: 1,
    },
});
