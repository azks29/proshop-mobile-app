import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { addToCart } from "../store/actions/cartActions";
import { createOrder } from "../store/actions/orderActions";

import Colors from "../assets/constants/Colors";

const PlaceOrderScreen = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, order } = orderCreate;

  // Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const subtotal = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  const shippingPrice = addDecimals(subtotal > 100 ? 0 : 100);

  const taxPrice = addDecimals(Number(subtotal * 0.2).toFixed(2));

  const totalPrice = (
    Number(subtotal) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      navigation.navigate("Order", { orderId2: order._id });
    }
  }, [success, navigation]);

  const submitHandler = () => {
    // setDisabled(true);
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        price: subtotal,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Shipping Address</Text>
        <Text style={styles.text}>
          {shippingAddress.address}, {shippingAddress.postalCode},{" "}
          {shippingAddress.city}, {shippingAddress.country}
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Payment Method</Text>
        <Text style={styles.text}>PayPal</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Order Items</Text>
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
            </View>
          ))}
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Order Summary</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.text}>Subtotal Price</Text>
          <Text style={styles.text}>$ {subtotal}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.text}>Shipping Price</Text>
          <Text style={styles.text}>{shippingPrice}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.text}>Tax Price</Text>
          <Text style={styles.text}>{taxPrice}</Text>
        </View>
      </View>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.text}>Total Price</Text>
        <Text style={styles.text}>{totalPrice}</Text>
      </View>
      <Button
        title="Place Order"
        color={Colors.primary}
        onPress={submitHandler}
        disabled={loading}
      />
    </ScrollView>
  );
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginBottom: 40,
    backgroundColor: "#fff",
  },
  mainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 10,
    fontFamily: "openSansBold",
  },
  text: {
    fontSize: 18,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 7,
    marginVertical: 20,
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
  },
});
