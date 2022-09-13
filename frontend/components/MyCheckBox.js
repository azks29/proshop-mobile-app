import { StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/constants/Colors";

const MyCheckBox = ({ checked, onChange }) => {
  //   const [checked, onChange] = useState(true);

  const onCheckmarkPress = () => {
    onChange(!checked);
  };
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onCheckmarkPress}
    >
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
};

export default MyCheckBox;

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
});
