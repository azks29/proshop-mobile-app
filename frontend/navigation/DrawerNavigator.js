import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import MainNavigator from "./MainNavigator";
import CustomDrawer from "../components/CustomDrawer";
import Colors from "../assets/constants/Colors";
import PaymentScreen from "../screens/PaymentScreen";
import { ProfileNavigation } from "./MainNavigator";

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let IconName;
          if (route.name === "Main") {
            IconName = focused ? "ios-home-outline" : "ios-home-outline";
          } else if (route.name === "Profile") {
            IconName = focused ? "person-outline" : "person-outline";
          } else if (route.name === "Admin") {
            IconName = focused ? "person-outline" : "person-outline";
          } else if (route.name === "Order") {
            IconName = focused ? "bookmarks-outline" : "bookmarks-outline";
          }
          return <Ionicons name={IconName} size={20} color={color} />;
        },
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -24,
          fontSize: 16,
        },
        drawerItemStyle: {
          marginVertical: 0,
        },
      })}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Main"
        component={MainNavigator}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileNavigation}
      />

      {/* {userInfo.isAdmin && (
        <Drawer.Screen name="Admin" component={AdminScren} />
      )} */}
      <Drawer.Screen name="Payment" component={PaymentScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
