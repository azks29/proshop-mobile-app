import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../assets/constants/Colors";
import { authenticate, setDidTryAL } from "../store/actions/userActions";

const StartUpScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const data = await AsyncStorage.getItem("userInfo");
        if (!data) {
          dispatch(setDidTryAL());
          return;
        }
        const transformData = JSON.parse(data);
        // if (!transformData) {
        //   dispatch(setDidTryAL());
        //   return;
        // }
        dispatch(authenticate(transformData));
      } catch (error) {
        console.log(error.message);
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartUpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
