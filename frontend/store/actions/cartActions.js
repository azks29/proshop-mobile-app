import axios from "../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CART_ADD_ITEM,
  CART_ITEM_FROM_STORAGE,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("cartItems", jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const cartItemsFromStorage = (data) => async (dispatch) => {
  dispatch({
    type: CART_ITEM_FROM_STORAGE,
    payload: data,
  });
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    const value = getState().cart.cartItems;
    storeData(value);
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  const value = getState().cart.cartItems;
  storeData(value);
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  saveShippingToStorage(data);
};

const saveShippingToStorage = async (data) => {
  try {
    const shippingAddress = JSON.stringify(data);
    await AsyncStorage.setItem("shippingAddress", shippingAddress);
  } catch (error) {
    console.error(error);
  }
};
