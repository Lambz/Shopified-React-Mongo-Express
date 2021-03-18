import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Students from "./components/Students";
// import StudentDetail from "./components/StudentDetail";
import SellerLogin from "./components/SellerLogin";
import SellerSignUp from "./components/SellerSignUp";
import SellerDashboard from "./components/SellerDashboard";
import UserDashboard from "./components/UserDashboard";
<<<<<<< HEAD
import Browse from "./components/Browse";
import ProductDetail from "./components/ProductDetail";
import ProductsList from "./components/ProductsList";
import ContactForBuy from "./components/ContactForBuy";
=======
import OldOrders from "./components/OldOrders";
import OrderDetails from "./components/OrderDetails";
import ChangePassword from "./components/ChangePassword";
import ContactForBuy from "./components/ContactForBuy";
import SignInScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import AddProuct from "./components/AddProduct";
import ProductDetail from "./components/ProductDetail";
import ProductsList from "./components/ProductsList";
>>>>>>> 76e083c87e80876c88bde44c53c26869f3c93c3a

const Stack = createStackNavigator();

export default () => (
    <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen name="Students" component={Students} />
            <Stack.Screen name="StudentDetails" component={StudentDetail} /> */}
            {/* <Stack.Screen name="SellerLogin" component={SellerLogin} />
            <Stack.Screen name="SellerSignUp" component={SellerSignUp} />
            <Stack.Screen name="SellerDashboard" component={SellerDashboard} /> */}
<<<<<<< HEAD
            {/* <Stack.Screen name="UserDashboard" component={UserDashboard} /> */}
            <Stack.Screen name="Browse" component={Browse} />
            <Stack.Screen name="Products List" component={ProductsList} />
            <Stack.Screen name="Product Detail" component={ProductDetail} />
            <Stack.Screen name="Contact For Buy" component={ContactForBuy} />
=======

            <Stack.Screen
                name="UserDashboard"
                component={UserDashboard}
                options={{ title: "Dashboard", headerShown: false }}
            />
            <Stack.Screen
                name="SellerDashboard"
                component={SellerDashboard}
                options={{ title: "Seller Dashboard", headerShown: false }}
            />
            <Stack.Screen
                name="AddProuct"
                component={AddProuct}
                options={{ title: "Add Product" }}
            />
            <Stack.Screen
                name="ProductsList"
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
                name="ProductDetail"
                component={ProductDetail}
                options={{ title: "ProductDetail" }}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ title: "Sign Up" }}
            />
>>>>>>> 76e083c87e80876c88bde44c53c26869f3c93c3a
        </Stack.Navigator>
    </NavigationContainer>
);
