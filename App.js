import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Students from "./components/Students";
// import StudentDetail from "./components/StudentDetail";
import SellerLogin from "./components/SellerLogin";
import SellerSignUp from "./components/SellerSignUp";
import SellerDashboard from "./components/SellerDashboard";
import UserDashboard from "./components/UserDashboard";

const Stack = createStackNavigator();

export default () => (
    <NavigationContainer>
        <Stack.Navigator>
            /* added modification */
            {/* <Stack.Screen name="Students" component={Students} />
            <Stack.Screen name="StudentDetails" component={StudentDetail} /> */}
            {/* <Stack.Screen name="SellerLogin" component={SellerLogin} />
            <Stack.Screen name="SellerSignUp" component={SellerSignUp} />
            <Stack.Screen name="SellerDashboard" component={SellerDashboard} /> */}
            <Stack.Screen name="UserDashboard" component={UserDashboard} />
        </Stack.Navigator>
    </NavigationContainer>
);
