import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../assets/constants/Colors";
import { getProductById } from "../store/actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductDetailsScreen = ({ route, navigation }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { productId, title } = route.params;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const headerName = title.split(" ").slice(0, 3).join(" ");

  useEffect(() => {
    navigation.setParams({
      productId: productId,
      qty: qty,
    });
    navigation.setOptions({
      headerTitle: headerName,
    });
  }, [navigation]);

  const addToCartHandler = () => {
    navigation.navigate("Cart", { productId: productId, qty: qty });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <ScrollView>
          <Image
            style={styles.image}
            source={{
              uri: `https://proshop-react-native.herokuapp.com${product.image}`,
            }}
          />

          <View style={styles.actions}>
            <View style={styles.qtyContainer}>
              <Text>Qty</Text>
              <Pressable
                disabled={product.countInStock === 0}
                onPress={() => setQty(qty <= 1 ? 1 : qty - 1)}
              >
                <AntDesign style={styles.icon} name="minus" size={22} />
              </Pressable>
              <Text>{qty}</Text>
              <Pressable
                disabled={product.countInStock === 0}
                onPress={() => {
                  setQty(qty + 1);
                }}
              >
                <AntDesign style={styles.icon} name="plus" size={22} />
              </Pressable>
            </View>

            <Button
              disabled={product.countInStock === 0}
              color={Colors.primary}
              title="to Cart"
              onPress={addToCartHandler}
            />
          </View>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.rating}>
            <Rating value={product.rating} text={product.rating} />
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
      )}
    </>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  qtyContainer: {
    flexDirection: "row",
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: "#888",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 15,
    backgroundColor: "#fff",
  },
  icon: {
    borderWidth: 1,
    borderColor: "#888",
    padding: 2,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  rating: {
    alignItems: "center",
    paddingBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
