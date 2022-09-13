import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../assets/constants/Colors";
import { login } from "../store/actions/userActions";

const SignInScreen = ({ navigation }) => {
  const [togle, setTogle] = useState(true);
  const [iconToggle, setIconToggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(email, password));
  };
  const visible = () => {
    setTogle(!togle);
    setIconToggle(!iconToggle);
  };
  return (
    <>
      <LinearGradient
        style={styles.rotait}
        colors={["#a13388", "#10356c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <LinearGradient
        colors={["#a13388", "#10356c"]}
        style={styles.rotaitBottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <View style={styles.form}>
              <Text style={styles.title}>Sign In</Text>
              <View style={styles.icons}>
                <Ionicons
                  style={styles.icon}
                  name="mail-outline"
                  size={24}
                  color={Colors.secondary}
                />
                <TextInput
                  style={styles.input}
                  keyboardType={"email-address"}
                  placeholder="enter email"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
              </View>
              {message === "please enter email" && (
                <Text style={{ color: "red" }}>{message}</Text>
              )}
              <View style={styles.icons}>
                <Ionicons
                  style={styles.icon}
                  name="lock-closed-outline"
                  size={24}
                  color={Colors.secondary}
                />
                <TextInput
                  style={styles.input}
                  secureTextEntry={togle}
                  title="enter password"
                  placeholder="enter password"
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                {iconToggle ? (
                  <Ionicons
                    style={styles.iconLeft}
                    name="eye-off-outline"
                    size={20}
                    color={Colors.secondary}
                    onPress={visible}
                  />
                ) : (
                  <Ionicons
                    style={styles.iconLeft}
                    name="eye-outline"
                    size={20}
                    color={Colors.secondary}
                    onPress={visible}
                  />
                )}
              </View>
              {message === "please enter password" && (
                <Text style={{ color: "red" }}>{message}</Text>
              )}
              {error && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 18,
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  {error}
                </Text>
              )}

              <TouchableOpacity disabled={loading} onPress={handleLogin}>
                <LinearGradient
                  style={styles.btn}
                  colors={["#000428", "#004e92"]}
                >
                  <Text style={styles.btnText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <View style={styles.signupBtn}>
                  <Text style={styles.signupBtnText}>Sign Up</Text>
                </View>
              </TouchableOpacity>

              {/* <View style={styles.dontHaveAccount}>
              <Text style={styles.signInText}>Don't have Account? </Text>
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signup}>Sing Up</Text>
              </Pressable>
            </View> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rotait: {
    width: "100%",
    height: 300,
    borderBottomRightRadius: 300,
    // backgroundColor: Colors.primary,
    // transform: [{ rotate: "160deg" }],
    position: "absolute",
    top: 0,
    left: 0,
  },
  rotaitBottom: {
    flex: 1,
    width: 200,
    height: 200,
    borderTopLeftRadius: 200,
    backgroundColor: Colors.primary,
    // transform: [{ rotate: "160deg" }],
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  resturantText: {
    fontSize: 30,
    color: "#000",
  },
  form: {
    width: "80%",
    height: "auto",
    backgroundColor: "#fff",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    padding: 30,
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "openSansBold",
    color: Colors.primary,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    fontSize: 18,
    marginTop: 10,
    // paddingBottom: 0,
    color: Colors.secondary,
    paddingLeft: 30,
  },
  btn: {
    width: "100%",
    marginVertical: 15,
    // paddingHorizontal: 50,
    paddingVertical: 8,
    // backgroundColor: Colors.primary,
    shadowOpacity: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowRadius: 1,
    elevation: 10,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  signupBtn: {
    width: "100%",
    backgroundColor: "#fff",
    // borderWidth: 0.5,
    borderColor: "#000",
    paddingVertical: 7,
    borderRadius: 5,
    shadowOpacity: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowRadius: 1,
    elevation: 10,
    borderRadius: 5,
  },
  signupBtnText: { fontSize: 18, textAlign: "center" },
  icon: {
    marginTop: 20,
    marginRight: 10,
    position: "absolute",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
  },
  iconLeft: {
    position: "absolute",
    paddingTop: 25,
    right: 0,
  },
  signInText: {
    fontSize: 18,
  },
  signup: {
    textAlign: "center",
    fontSize: 20,
    color: Colors.primary,
  },
  dontHaveAccount: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
