import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Message = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "openSansBold",
    color: "red",
  },
});

export default Message;
