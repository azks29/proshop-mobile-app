import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../assets/constants/Colors";
import { getOrderDetails } from "../store/actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { orderId1, orderId2 } = route.params;

  const orderId = orderId1 || orderId2;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  // Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const subtotal =
    order &&
    order.orderItems &&
    addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.pric * item.qty, 0)
    );
  useEffect(() => {
    navigation.setOptions({
      //   headerLeft: () => (
      //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //       <Item
      //         // style={{ marginLeft: 15 }}
      //         iconName="arrow-back"
      //         iconSize={24}
      //         onPress={() => navigation.navigate("Profile")}
      //       />
      //     </HeaderButtons>
      //   ),
      // headerTintColor: "#fff",
      // headerTitleAlign: "center",
      // headerStyle: { backgroundColor: Colors.primary },

      headerShown: orderId1 ? true : false,
    });
  }, [navigation]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.row}>
          <Text style={styles.title}>Order No: </Text>
          <Text style={styles.title}>{order._id}</Text>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.title}>Shipping</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>
              {order && order.user && order.user.name}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.text}>
              {order && order.user && order.user.email}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Address: </Text>
            <Text style={styles.text}>
              {order && order.shippingAddress && order.shippingAddress.address},{" "}
              {order && order.shippingAddress && order.shippingAddress.city},{" "}
              {order &&
                order.shippingAddress &&
                order.shippingAddress.postalCode}{" "}
              ,{order && order.shippingAddress && order.shippingAddress.country}{" "}
            </Text>
          </View>
          <View>
            {order.isDelivered ? (
              <Text>Paid At</Text>
            ) : (
              <Text>Not Delivered</Text>
            )}
          </View>
        </View>

        <View style={styles.viewContainer}>
          <View>
            <Text style={styles.title}>Payment Method</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Method</Text>
            <Text style={styles.text}>Paypal</Text>
          </View>
          <View>
            {order.isPaid ? <Text>Paid at</Text> : <Text>Not Paid</Text>}
          </View>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.title}>Order Items</Text>
          {order &&
            order.orderItems &&
            order.orderItems.map((item) => (
              <View key={item._id} style={styles.itemContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://proshop-react-native.herokuapp.com${item.image}`,
                  }}
                />
                <View>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>
                    {item.qty} x $ {item.price} = $ {item.qty * item.price}
                  </Text>
                </View>
              </View>
            ))}
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.title}>Order Summary</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Subtotal Price</Text>
            <Text style={styles.text}>{subtotal}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Shipping</Text>
            <Text style={styles.text}>{order.shippingPrice}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Tax</Text>
            <Text style={styles.text}>{order.taxPrice}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Total</Text>
            <Text style={styles.text}>{order.totalPrice}</Text>
          </View>
        </View>
        {orderId2 && (
          <View style={styles.actions}>
            <Button
              title="Continue Shopping"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    // paddingVertical: 20,
    marginVertical: 40,
    // justifyContent: "center",
    // alignItems: "center"
  },
  viewContainer: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontFamily: "openSansBold",
    marginBottom: 10,
    color: Colors.primary,
  },
  text: {
    fontSize: 16,
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 8,
    shadowRadius: 5,
    elevation: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderLeftRadius: 8,
    marginRight: 10,
  },
  actions: {
    marginBottom: 40,
  },
});
