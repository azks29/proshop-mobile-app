import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../assets/constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";

const defaultHeaderOptions = {
  headerTintColor: "#fff",
  headerTitleAlign: "center",
  headerBackground: () => (
    <LinearGradient
      colors={["#a13388", "#10356c"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  ),
};

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen
        options={{ headerTitle: "Shopping Cart" }}
        name="Cart"
        component={CartScreen}
      />
      <Stack.Screen name="Shipping" component={ShippingScreen} />
      <Stack.Screen
        options={{ headerTitle: "Place Order" }}
        name="PlaceOrder"
        component={PlaceOrderScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "My Order",
        }}
        name="Order"
        component={OrderScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator();

export const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator screenOptions={defaultHeaderOptions}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen
        options={{
          headerTitle: "My Order",
        }}
        name="Order"
        component={OrderScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default MainNavigator;
