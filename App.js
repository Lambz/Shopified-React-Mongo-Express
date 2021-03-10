import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Students from "./components/Students";
// import StudentDetail from "./components/StudentDetail";

const Stack = createStackNavigator();

export default () => (
    <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen name="Students" component={Students} />
            <Stack.Screen name="StudentDetails" component={StudentDetail} /> */}
        </Stack.Navigator>
    </NavigationContainer>
);
