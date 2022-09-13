import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import axios from "../axios";
import Colors from "../assets/constants/Colors";
import Rating from "./Rating";

const Product = ({ product, onDetails, onAddToCart }) => {
  const navigation = useNavigation();
  const image = product.image.split("/")[(1, 2)];
  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("ProductDetails", {
          productId: product._id,
          title: product.name,
        })
      }
      useForeground
    >
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `https://proshop-react-native.herokuapp.com/uploads/${image}`,
            }}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
          <Rating value={product.rating} text={` ${product.rating}`} />
        </View>
        <View style={styles.actions}>
          <Button color={Colors.primary} title="Details" onPress={onDetails} />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={onAddToCart}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Product;

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "20%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 20,
  },
});
