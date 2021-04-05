import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { ButtonGroup, Header } from "react-native-elements";
import { codes } from "../model/expressHandler";
import { fetchOrdersForSeller, getUID, signOut } from "../model/interface";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from "react-native-chart-kit";
import {
    analyzeProductDataMonth,
    analyzeProductDataWeek,
    analyzeProductDataYear,
    analyzeSalesDataMonth,
    analyzeSalesDataWeek,
    analyzeSalesDataYear,
    analyzeCategoryDataWeek,
    analyzeCategoryDataMonth,
    analyzeCategoryDataYear,
    formatDateMonth,
} from "../Utils";
import Moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

const config = {
    backgroundColor: "#4089d6",
    backgroundGradientFrom: "#4089d6",
    backgroundGradientTo: "#4089d6",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726",
    },
};
export default function SellerHome({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [salesTime, setSalesTime] = useState(0);
    const [productsTime, setProductsTime] = useState(0);
    const [categoryTime, setCategoryTime] = useState(0);
    const [orders, setOrders] = useState(null);
    const [data, setData] = useState({
        labels: ["January"],
        datasets: [
            {
                data: [Math.random() * 100],
            },
        ],
    });

    const [productsData, setProductsData] = useState({
        labels: ["January"],
        datasets: [
            {
                data: [Math.random() * 100],
            },
        ],
    });

    const [categoryData, setCategoryData] = useState({
        labels: ["January"],
        datasets: [
            {
                data: [Math.random() * 100],
            },
        ],
    });

    const orderDetailsHandler = (orders) => {
        console.log(orders);
        setOrders(orders);
        if (salesTime == 0) {
            setData(analyzeSalesDataWeek(orders));
        } else if (salesTime == 1) {
            setData(analyzeSalesDataMonth(orders));
        } else {
            setData(analyzeSalesDataYear(orders));
        }
        if (productsTime == 0) {
            setProductsData(analyzeProductDataWeek(orders));
        } else if (productsTime == 1) {
            setProductsData(analyzeProductDataMonth(orders));
        } else {
            setProductsData(analyzeProductDataYear(orders));
        }
        if (categoryTime == 0) {
            setCategoryData(analyzeCategoryDataWeek(orders));
        } else if (categoryTime == 1) {
            setCategoryData(analyzeCategoryDataMonth(orders));
        } else {
            setCategoryData(analyzeCategoryDataYear(orders));
        }
    };

    if (isLoading) {
        fetchOrdersForSeller(getUID(), orderDetailsHandler);
        setLoading(false);
    }

    const signOutClicked = () => {
        signOut((code) => {
            if (code == codes.LOGOUT_SUCCESS) {
                route.params.resetToTop();
            }
        });
    };
    const updateSalesTimes = (val) => {
        setSalesTime(val);
        if (val == 0) {
            setData(analyzeSalesDataWeek(orders));
        } else if (val == 1) {
            setData(analyzeSalesDataMonth(orders));
        } else {
            setData(analyzeSalesDataYear(orders));
        }
    };

    const updateProductsTimes = (val) => {
        setProductsTime(val);
        if (val == 0) {
            setProductsData(analyzeProductDataWeek(orders));
        } else if (val == 1) {
            setProductsData(analyzeProductDataMonth(orders));
        } else {
            setProductsData(analyzeProductDataYear(orders));
        }
    };

    const updateCategoriesTimes = (val) => {
        setCategoryTime(val);
        if (val == 0) {
            setCategoryData(analyzeCategoryDataWeek(orders));
        } else if (val == 1) {
            setCategoryData(analyzeCategoryDataMonth(orders));
        } else {
            setCategoryData(analyzeCategoryDataYear(orders));
        }
    };

    const buttons = ["This Week", "This Year", "Last 10 Years"];
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
            <ScrollView style={{ padding: 5 }}>
                <Text style={{ fontSize: 28 }}>Sales</Text>
                <ButtonGroup
                    onPress={(val) => updateSalesTimes(val)}
                    selectedIndex={salesTime}
                    buttons={buttons}
                    // containerStyle={{ height: 100 }}
                />
                <LineChart
                    data={data}
                    width={Dimensions.get("window").width - 10} // from react-native
                    height={220}
                    yAxisLabel="No."
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={config}
                    bezier
                    style={{
                        marginVertical: 5,
                        borderRadius: 16,
                    }}
                />

                <Text style={{ fontSize: 28, marginTop: 20 }}>Products</Text>
                <ButtonGroup
                    onPress={(val) => updateProductsTimes(val)}
                    selectedIndex={productsTime}
                    buttons={buttons}
                    // containerStyle={{ height: 100 }}
                />
                <BarChart
                    data={productsData}
                    width={Dimensions.get("window").width - 10} // from react-native
                    height={220}
                    yAxisLabel="No."
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={config}
                    bezier
                    style={{
                        marginVertical: 5,
                        borderRadius: 16,
                    }}
                />

                <Text style={{ fontSize: 28, marginTop: 20 }}>Category</Text>
                <ButtonGroup
                    onPress={(val) => updateCategoriesTimes(val)}
                    selectedIndex={categoryTime}
                    buttons={buttons}
                    // containerStyle={{ height: 100 }}
                />
                <BarChart
                    data={categoryData}
                    width={Dimensions.get("window").width - 10} // from react-native
                    height={220}
                    yAxisLabel="No."
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={config}
                    bezier
                    style={{
                        marginVertical: 5,
                        borderRadius: 16,
                        marginBottom: 20,
                    }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    text: {
        fontSize: 24,
        marginLeft: 10,
    },
});
