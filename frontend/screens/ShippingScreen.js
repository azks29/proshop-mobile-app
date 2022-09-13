import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Colors from "../assets/constants/Colors";
import MyCheckBox from "../components/MyCheckBox";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../store/actions/cartActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const ShippingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [checked, onChange] = useState(true);

  const shippingFromStorage = useCallback(async () => {
    const data = await AsyncStorage.getItem("shippingAddress");

    if (!data) {
      return {};
    }
    const shippingAddress = await JSON.parse(data);
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setCountry(shippingAddress.country);
    }
  }, [dispatch]);

  useEffect(() => {
    shippingFromStorage();
  }, [shippingFromStorage]);

  const submitHandler = () => {
    if (address === "") {
      setMessage("Please enter Address");
    } else if (city === "") {
      setMessage("Please enter city");
    } else if (postalCode === "") {
      setMessage("Please enter postal Code");
    } else if (country === "") {
      setMessage("Please enter country");
    } else if (!checked) {
      setMessage("Please select payment method");
    } else {
      dispatch(
        saveShippingAddress({ address, city, postalCode, country, checked })
      );
      navigation.navigate("PlaceOrder");
    }
  };
  return (
    <>
      {/* {<CheckoutSteps step1 step2 />} */}
      <LinearGradient style={styles.linear} colors={["#a13388", "#10356c"]} />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.shippingText}>Shipping Address</Text>
          <View>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                setMessage("");
              }}
              keyboardType="default"
              placeholder="Address"
            />
            {message === "Please enter Address" && (
              <Text style={styles.message}>{message}</Text>
            )}
          </View>

          <View>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={(text) => setCity(text)}
              keyboardType="default"
              placeholder="City"
            />
            {message === "Please enter city" && (
              <Text style={styles.message}>{message}</Text>
            )}
          </View>

          <View>
            <TextInput
              style={styles.input}
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              keyboardType="default"
              placeholder="Postal code"
            />
            {message === "Please enter postal Code" && (
              <Text style={styles.message}>{message}</Text>
            )}
          </View>

          <View>
            <TextInput
              style={styles.input}
              value={country}
              onChangeText={(text) => setCountry(text)}
              keyboardType="default"
              placeholder="Country"
            />
            {message === "Please enter country" && (
              <Text style={styles.message}>{message}</Text>
            )}
          </View>
          <View style={styles.check}>
            <Text style={{ paddingBottom: 5 }}>Paypal Debit Credit card</Text>
            <MyCheckBox checked={checked} onChange={onChange} />
            {message === "Please select payment method" && (
              <Text style={styles.message}>{message}</Text>
            )}
          </View>

          <View style={styles.button}>
            <Button
              title="continue"
              color={Colors.primary}
              onPress={submitHandler}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ShippingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linear: {
    width: "100%",
    height: "100%",
    transform: [{ rotate: "240deg" }],
    position: "absolute",
    bottom: -250,
    // top: 150,
    // left: 40,
    overflow: "hidden",
  },
  inputContainer: {
    width: "80%",
    height: 400,
    backgroundColor: "#fff",
    paddingHorizontal: "10%",
    paddingTop: 30,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  shippingText: {
    fontSize: 18,
    color: Colors.primary,
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
  check: {
    marginVertical: 10,
  },
  button: {
    width: 220,
  },
  message: {
    color: "red",
  },
});
