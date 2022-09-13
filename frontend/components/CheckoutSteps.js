import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../assets/constants/Colors";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {step1 ? (
        <Button
          title="Login"
          color={Colors.primary}
          onPress={() => navigation.navigate("Login")}
        />
      ) : (
        <Button title="Login" disabled />
      )}
      {step2 ? (
        <Button
          title="shipping"
          color={Colors.primary}
          onPress={() => navigation.navigate("Shipping")}
        />
      ) : (
        <Button title="shipping" disabled />
      )}
      {step3 ? (
        <Button
          title="Payment"
          color={Colors.primary}
          onPress={() => navigation.navigate("Payment")}
        />
      ) : (
        <Button title="Payment" disabled />
      )}
      {step4 ? (
        <Button
          title="place order"
          color={Colors.primary}
          onPress={() => navigation.navigate("PlaceOrder")}
        />
      ) : (
        <Button title="place order" disabled />
      )}
    </View>
  );
};

export default CheckoutSteps;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
