import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Input = ({ children, title, error }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        {...children}
        style={styles.input}
        placeholder="enter name"
        // value={name}
        // onChangeText={inputChangeHandler.bind(this, "name")}
      />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  title: { fontSize: 18 },
  input: {
    width: "80%",
    height: 40,
    borderBottomWidth: 1,
    // borderBottomColor: Colors.secondary,
    fontSize: 18,
    marginTop: 10,
    // paddingBottom: 5,
    // color: Colors.secondary,
    paddingLeft: 30,
  },
});
