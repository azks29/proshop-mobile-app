import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Product from "../components/Product";
import { getProducts } from "../store/actions/productActions";
import HeaderButton from "../components/HeaderButton";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = ({ navigation }) => {
  const [searchToggle, setSearchToggle] = useState(false);
  const [search, setSearch] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);

  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(10)).current;

  const fadeIn = () => {
    setSearchToggle(!searchToggle);
    Animated.spring(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: searchToggle ? "" : "Proshop",
      headerRight: () => (
        <>
          {searchToggle ? (
            <Animated.View
              style={[
                styles.searchContainer,
                { transform: [{ translateY: fadeAnim }] },
              ]}
            >
              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder="search"
              />
              {search.length >= 1 ? (
                <Ionicons
                  color="#ccc"
                  style={styles.searchIcon}
                  name="search"
                  size={20}
                />
              ) : (
                <Ionicons
                  onPress={() => setSearchToggle(!searchToggle)}
                  color="#ccc"
                  style={styles.searchIcon}
                  name="close"
                  size={20}
                />
              )}
            </Animated.View>
          ) : (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="search"
                iconName="search"
                iconSize={25}
                onPress={fadeIn}
              />
            </HeaderButtons>
          )}
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="cart"
              iconName="cart"
              iconSize={25}
              onPress={() => navigation.navigate("Cart", {})}
            />
            {cartItems.length >= 1 ? (
              <View style={styles.cartQtyView}>
                <Text style={{ fontSize: 12, color: "#fff" }}>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </HeaderButtons>
        </>
      ),
      headerLeft: () =>
        !searchToggle && (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="menu"
              iconName="menu-outline"
              iconSize={30}
              onPress={() => navigation.openDrawer()}
            />
          </HeaderButtons>
        ),
    });
  }, [navigation, searchToggle, search]);

  // const fetchProducts = useCallback(() => {
  //   setisRefreshing(true);
  //   dispatch(getProducts());
  //   setisRefreshing(false);
  // }, [dispatch]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", fetchProducts);
  //   return unsubscribe;
  // }, [navigation, fetchProducts]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, navigation]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <FlatList
      // onRefresh={fetchProducts}
      // refreshing={isRefreshing}
      data={products}
      renderItem={(product) => (
        <Product
          product={product.item}
          onNavigaiton={navigation}
          onAddToCart={() => {
            navigation.navigate("Cart", {
              productId: product.item._id,
              qty: 1,
            });
          }}
          onDetails={() =>
            navigation.navigate("ProductDetails", {
              productId: product.item._id,
              title: product.item.name,
            })
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 5,
    borderRadius: 4,
  },
  searchIcon: {
    position: "absolute",
    right: 35,
    top: 8,
  },
  cartQtyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 3,
    bottom: 15,
    width: 15,
    height: 15,
    borderRadius: 7,
  },
});

export default HomeScreen;
