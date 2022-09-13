import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const Rating = ({ value, text, color }) => {
  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          color={color}
          name={
            value >= 1 ? "star" : value >= 0.5 ? "star-half" : "star-outline"
          }
          size={20}
        />
      </View>
      <View>
        <Ionicons
          color={color}
          name={
            value >= 2 ? "star" : value >= 1.5 ? "star-half" : "star-outline"
          }
          size={20}
        />
      </View>

      <View>
        <Ionicons
          color={color}
          name={
            value >= 3 ? "star" : value >= 2.5 ? "star-half" : "star-outline"
          }
          size={20}
        />
      </View>

      <View>
        <Ionicons
          color={color}
          name={
            value >= 4 ? "star" : value >= 3.5 ? "star-half" : "star-outline"
          }
          size={20}
        />
      </View>

      <View>
        <Ionicons
          color={color}
          name={
            value >= 5 ? "star" : value >= 4.5 ? "star-half" : "star-outline"
          }
          size={20}
        />
      </View>
      <Text>{text}</Text>
    </View>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Rating;
