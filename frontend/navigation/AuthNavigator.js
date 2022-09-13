import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/LogInScreen";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerTintColor: "#fff",
    //   headerTitleAlign: "center",
    //   headerBackground: () => (
    //     <LinearGradient
    //       colors={["#a13388", "#10356c"]}
    //       style={{ flex: 1 }}
    //       start={{ x: 0, y: 0 }}
    //       end={{ x: 1, y: 0 }}
    //     />
    //   ),
    // }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Sign In",
          headerShown: false,
        }}
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        options={{
          // headerTitle: "Sign Up",
          // headerBackVisible: false,
          headerShown: false,
        }}
        name="SignUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
