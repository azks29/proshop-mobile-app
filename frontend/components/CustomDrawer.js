import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { logout } from "../store/actions/userActions";

const CustomDrawer = (props) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#a13388" }}
      >
        <LinearGradient
          style={styles.background}
          colors={["#a13388", "#10356c"]}
        >
          <Image
            style={styles.image}
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
            }}
          />
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </LinearGradient>
        <View style={styles.drawerItemList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={() => {}} style={styles.bottomTouchable}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={24} />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => dispatch(logout())}
          style={styles.bottomTouchable}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={24} />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    padding: 20,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userName: {
    color: "#fff",
    fontFamily: "openSansBold",
    fontSize: 18,
  },
  email: { fontSize: 16, color: "#fff" },
  drawerItemList: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 5,
  },
  bottomView: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default CustomDrawer;
