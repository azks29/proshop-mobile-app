import { Button, Image, StyleSheet, Text, View, Animated } from "react-native";
import React, { useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import {
  addToCart,
  removeFromCart,
  cartItemsFromStorage,
} from "../store/actions/cartActions";
import Colors from "../assets/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const CartScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { productId, qty } = route.params;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cartdataFromStorage = useCallback(async () => {
    try {
      const data = (await AsyncStorage.getItem("cartItems"))
        ? JSON.parse(await AsyncStorage.getItem("cartItems"))
        : [];
      data.map((item) => item && dispatch(addToCart(item.product, item.qty)));
      dispatch(cartItemsFromStorage(data));
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);
  useEffect(() => {
    cartdataFromStorage();
  }, []);

  const removeFromCartHandler = useCallback(
    (id) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );
  return (
    <View style={styles.container}>
      <View style={styles.topLinearContainer}>
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={styles.topLinear}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
      <View style={styles.linearContainer}>
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={styles.linear}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
      {cartItems.length === 0 ? (
        <Text style={styles.cartEmpty}>Your Cart is Empty</Text>
      ) : (
        <View>
          {cartItems.map((item) => (
            <View key={item.product} style={styles.itemsContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://proshop-react-native.herokuapp.com${item.image}`,
                }}
              />
              <View style={{ width: 220 }}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>
                    {item.name.split(" ").slice(0, 3).join(" ")}
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>$ {item.price}</Text>
                  <View style={styles.iconContainer}>
                    {item.qty <= 1 ? (
                      <AntDesign style={styles.plus} name="minus" size={24} />
                    ) : (
                      <AntDesign
                        style={styles.plus}
                        name="minus"
                        color={Colors.primary}
                        size={24}
                        onPress={() =>
                          dispatch(addToCart(item.product, item.qty - 1))
                        }
                      />
                    )}

                    <Text style={{ fontSize: 16 }}>{item.qty}</Text>
                    <AntDesign
                      style={styles.plus}
                      color={Colors.primary}
                      name="plus"
                      size={24}
                      onPress={() =>
                        dispatch(addToCart(item.product, item.qty + 1))
                      }
                    />
                  </View>
                </View>
              </View>
              <Ionicons
                style={{ marginLeft: 15 }}
                name="trash"
                size={24}
                color={Colors.primary}
                onPress={removeFromCartHandler.bind(this, item.product)}
              />
            </View>
          ))}
          <View style={styles.priceDEtailsContainer}>
            <Text style={styles.priceDetails}>Price Details</Text>
            <View style={styles.priceDetailsView}>
              <Text style={styles.priceText}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </Text>
              <Text style={styles.priceText}>
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Text>
            </View>
            <Button
              onPress={() => navigation.navigate("Shipping")}
              disabled={cartItems.length === 0}
              title="procced"
              color={Colors.primary}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  topLinearContainer: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 0,
    right: 0,
  },
  topLinear: { width: "100%", height: "100%", borderBottomLeftRadius: 200 },
  linearContainer: {
    width: "100%",
    height: 400,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  linear: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 400,
  },
  cartEmpty: {
    fontSize: 20,
    color: Colors.primary,
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderRadius: 7,
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },

  nameContainer: {
    flexDirection: "row",
  },
  name: {
    fontSize: 18,
  },
  priceDEtailsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  price: { fontSize: 16 },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
  },
  plus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
  },
  priceDetails: {
    fontSize: 20,
    fontFamily: "openSansBold",
    color: Colors.primary,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  priceDetailsView: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  priceText: {
    fontSize: 17,
  },
});
