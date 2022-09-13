import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../assets/constants/Colors";
import {
  updateUserProfile,
  getUserProfile,
  logout,
} from "../store/actions/userActions";
import { listMyOrders } from "../store/actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useCallback } from "react";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState("");
  const [form, setForm] = useState(false);

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, profile } = userProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, orders } = orderListMy;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const fetchUser = useCallback(() => {
    dispatch(getUserProfile());
    dispatch(listMyOrders());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchUser);
    return unsubscribe;
  }, [navigation, fetchUser]);

  // useEffect(() => {
  //   dispatch(getUserProfile());
  //   dispatch(listMyOrders());
  // }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="menu"
            iconSize={30}
            onPress={() => navigation.openDrawer()}
          />
        </HeaderButtons>
      ),
      headerTitle: "Profile",
    });
  }, [navigation]);

  const fadeAnim = useRef(new Animated.Value(200)).current;

  const fadeIn = () => {
    setForm(!form);
    Animated.spring(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    if (profile.name) {
      setName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
    }
  };

  const fadeOut = () => {
    setForm(!form);
    Animated.spring(fadeAnim, {
      toValue: 200,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const submitHandler = () => {
    if (password !== password2) {
      Alert.alert("passwords do not match", "passwords do not match", [
        { text: "okay" },
      ]);
    } else {
      dispatch(
        updateUserProfile({
          _id: profile._id,
          name,
          email,
          phone,
          password,
        })
      );
      if (success) {
        Alert.alert("Update succeed", "successfully upadated Profile", [
          { text: "okay" },
        ]);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <View style={styles.container}>
          <LinearGradient
            colors={["#a13388", "#10356c"]}
            style={styles.linearBottom}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          ></LinearGradient>
          <LinearGradient
            colors={["#a13388", "#10356c"]}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: image
                    ? image
                    : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
                }}
              />
              <View style={styles.imageAction}>
                <Pressable onPress={pickImage}></Pressable>
              </View>
            </View>

            <Text style={styles.text}>{profile && profile.name}</Text>
            <Text style={styles.text}>{profile && profile.email}</Text>
            <Text style={styles.text}>{profile && profile.phone}</Text>
            <TouchableNativeFeedback onPress={fadeIn}>
              <View style={styles.editProfileView}>
                <Text style={styles.editProfileText}>edit profile</Text>
                <MaterialIcons name="edit" size={20} color="#fff" />
              </View>
            </TouchableNativeFeedback>
          </LinearGradient>
          {form ? (
            <Animated.View
              style={[
                styles.formContainer,
                { transform: [{ translateY: fadeAnim }] },
              ]}
            >
              <Ionicons
                style={styles.closeIcon}
                name="close"
                size={24}
                onPress={fadeOut}
              />
              <Text style={styles.profileText}>Update Profile</Text>
              <View style={styles.icons}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(text) => setName(text)}
                  keyboardType="default"
                  placeholder="enter name"
                />
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="default"
                  placeholder="enter email"
                />
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  keyboardType="default"
                  placeholder="enter phone"
                />
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  placeholder="enter password"
                />
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  value={password2}
                  onChangeText={(text) => setPassword2(text)}
                  secureTextEntry={true}
                  placeholder="conform password"
                />
              </View>
              <View style={styles.button}>
                <Button
                  onPress={submitHandler}
                  title="update"
                  color={Colors.primary}
                />
              </View>
            </Animated.View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ width: "100%" }}>
                <Text style={styles.title}>My Orders</Text>
                {orders && orders.length === 0 ? (
                  <Text>No Orders Found</Text>
                ) : (
                  orders &&
                  orders.map((order) => (
                    <View style={styles.ordersContainer} key={order._id}>
                      <Text style={styles.orderText}>
                        Order No: {order._id}
                      </Text>
                      <View style={styles.row}>
                        <Text style={styles.orderText}>
                          {order.isPaid ? order.paidAt : "Not paid"}
                        </Text>
                        <Text style={styles.orderText}>
                          total ${order.totalPrice}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.orderText}>
                          {order.isDelivered
                            ? order.deliveredAt
                            : "Not Delivered"}
                        </Text>
                        <TouchableNativeFeedback
                          onPress={() =>
                            navigation.navigate("Order", {
                              orderId1: order._id,
                            })
                          }
                        >
                          <View style={styles.orderActions}>
                            <Text style={styles.btnText}>Details</Text>
                          </View>
                        </TouchableNativeFeedback>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  linearGradient: {
    alignItems: "center",
    width: "100%",
    height: 280,
    paddingTop: 40,
    borderTopRightRadius: 200,
    borderBottomLeftRadius: 200,
  },
  linearBottom: {
    width: 200,
    height: 200,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopRightRadius: 200,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    fontFamily: "openSansBold",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "relative",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
  },
  imageAction: {
    width: 80,
    height: 30,
    backgroundColor: "#888",
    color: "#ccc",
    position: "relative",
    bottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    marginTop: 5,
  },
  formContainer: {
    width: "80%",
    height: "auto",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    position: "absolute",
    top: 210,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  closeIcon: {
    borderLeftWidth: 1,
    borderbottomWidth: 1,
    borderTopRightRadius: 10,
    padding: 2,
    position: "absolute",
    top: 0,
    right: 0,
  },
  input: {
    width: 220,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    fontSize: 18,
    marginTop: 10,
    color: Colors.secondary,
  },
  button: {
    width: 220,
    marginTop: 20,
  },
  profileText: {
    fontSize: 18,
    color: Colors.primary,
    // marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "openSansBold",
    marginVertical: 10,
    color: Colors.primary,
    paddingVertical: 5,
    textAlign: "center",
  },
  ordersContainer: {
    width: "90%",
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: "5%",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  orderText: {
    fontSize: 16,
  },
  editProfileView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    right: 15,
    padding: 5,
    borderWidth: 0.5,
    // borderRadius: 3,
    borderColor: "#fff",
  },
  editProfileText: {
    fontSize: 18,
    paddingRight: 4,
    color: "#fff",
  },
  orderActions: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
  },
});
