import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SellerLogin from "./components/SellerLogin";
import SellerSignUp from "./components/SellerSignUp";
import SellerDashboard from "./components/SellerDashboard";
import UserDashboard from "./components/UserDashboard";
import Browse from "./components/Browse";
import ProductDetail from "./components/ProductDetail";
import ProductsList from "./components/ProductsList";
import ContactForBuy from "./components/ContactForBuy";
import OldOrders from "./components/OldOrders";
import OrderDetails from "./components/OrderDetails";
import ChangePassword from "./components/ChangePassword";

import SignInScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import AddProuct from "./components/AddProduct";
import SellerOrderDetails from "./components/SellerOrderDetails";

const Stack = createStackNavigator();

export default () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="UserDashboard"
                component={UserDashboard}
                options={{ title: "Dashboard", headerShown: false }}
            />
            <Stack.Screen
                name="SellerLogin"
                component={SellerLogin}
                options={{ title: "Seller Login" }}
            />

            <Stack.Screen
                name="SellerDashboard"
                component={SellerDashboard}
                options={{ title: "Seller Dashboard", headerShown: false }}
            />
            {/* <Stack.Screen name="Students" component={Students} />
            <Stack.Screen name="StudentDetails" component={StudentDetail} /> */}
            <Stack.Screen
                name="SellerOrderDetails"
                component={SellerOrderDetails}
                options={{ title: "Order Details" }}
            />
            <Stack.Screen
                name="SellerSignUp"
                component={SellerSignUp}
                options={{ title: "Seller Sign Up" }}
            />
            <Stack.Screen
                name="AddProuct"
                component={AddProuct}
                options={{ title: "Add Product" }}
            />
            <Stack.Screen
                name="Browse"
                component={Browse}
                options={{ title: "Browse Categories" }}
            />
            <Stack.Screen
                name="Products List"
                component={ProductsList}
                options={{ title: "ProductsList" }}
            />
            <Stack.Screen
                name="OldOrders"
                component={OldOrders}
                options={{ title: "Your Orders" }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{ title: "Order Details" }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ title: "Change Password" }}
            />
            <Stack.Screen
                name="ContactForBuy"
                component={ContactForBuy}
                options={{ title: "Delivery Details" }}
            />
            <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ title: "Sign In" }}
            />
            <Stack.Screen
                name="Product Detail"
                component={ProductDetail}
                options={{ title: "ProductDetail" }}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ title: "Sign Up" }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);
