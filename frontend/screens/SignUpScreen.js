import React, { useState, useEffect, useReducer } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../assets/constants/Colors";
import { register } from "../store/actions/userActions";
import Input from "../components/Input";

const SIGNUP_UPDATE = "SIGNUP_UPDATE";

const signUpReducer = (state, action) => {
  if (action.type === SIGNUP_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    return {
      ...state,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignUpScreen = ({ navigation }) => {
  const [togle, setTogle] = useState(true);
  const [iconToggle, setIconToggle] = useState(true);
  const [message, setMessage] = useState(null);
  const [validUser, setValidUser] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [userLabel, setUserLabel] = useState(false);
  const [signUpState, dispatchSignUp] = useReducer(signUpReducer, {
    inputValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
    },
  });

  const { name, email, phone, password, password2 } = signUpState.inputValues;

  const inputChangeHandler = (inputIdentifier, text) => {
    dispatchSignUp({
      type: SIGNUP_UPDATE,
      value: text,
      input: inputIdentifier,
    });
  };
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  console.log(error);

  useEffect(() => {
    dispatch(register({ name, email, phone, password }));
  }, [dispatch]);

  const handleSubmit = () => {
    if (error) {
      setValidUser(true);
      setValidEmail(true);
      setValidPhone(true);
      setValidPassword(true);
    }
    if (password !== password2) {
      setMessage("password do not match");
    } else {
      dispatch(register({ name, email, phone, password }));
    }
  };

  const visible = () => {
    setTogle(!togle);
    setIconToggle(!iconToggle);
  };

  const handleValidUser = () => {
    dispatch(register({ name, email, phone, password }));
    if (error && error.name) {
      setValidUser(true);
    } else {
      setValidUser(false);
    }
  };

  const handleValidEmail = () => {
    dispatch(register({ name, email, phone, password }));
    if (error && error.email) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handleValidPhone = () => {
    dispatch(register({ name, email, phone, password }));
    if (error && error.phone) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }
  };

  const handleValidPassword = () => {
    dispatch(register({ password }));
    if (error && error.password) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  return (
    <>
      <LinearGradient
        colors={["#a13388", "#10356c"]}
        style={styles.rotaitBottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <LinearGradient
        colors={["#a13388", "#10356c"]}
        style={styles.rotait}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <View style={styles.form}>
              <Text style={styles.title}>Register</Text>
              <View style={styles.icons}>
                <Ionicons
                  style={styles.icon}
                  name="md-person-outline"
                  size={24}
                  color={Colors.secondary}
                />
                <TextInput
                  style={styles.input}
                  keyboardType={"default"}
                  placeholder="enter name"
                  autoComplete="name"
                  name="name"
                  value={name}
                  onChangeText={inputChangeHandler.bind(this, "name")}
                  onEndEditing={handleValidUser}
                />
              </View>
              {error && error.name && validUser && (
                <Text style={styles.errorText}>{error.name}</Text>
              )}

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
                  autoComplete="email"
                  name="email"
                  value={email}
                  onChangeText={inputChangeHandler.bind(this, "email")}
                  onEndEditing={handleValidEmail}
                />
              </View>
              {error && error.email && validEmail && (
                <Text style={styles.errorText}>{error.email}</Text>
              )}
              <View style={styles.icons}>
                <Ionicons
                  style={styles.icon}
                  name="call-outline"
                  size={24}
                  color={Colors.secondary}
                />
                <TextInput
                  style={styles.input}
                  keyboardType={"phone-pad"}
                  placeholder="enter phone"
                  name="phon"
                  maxLength={11}
                  value={phone}
                  onChangeText={inputChangeHandler.bind(this, "phone")}
                  onEndEditing={handleValidPhone}
                />
              </View>
              {error && error.phone && validPhone && (
                <Text style={styles.errorText}>{error.phone}</Text>
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
                  placeholder="enter password"
                  name="password"
                  value={password}
                  onChangeText={inputChangeHandler.bind(this, "password")}
                  onEndEditing={handleValidPassword}
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
              {error && error.password && validPassword && (
                <Text style={styles.errorText}>{error.password}</Text>
              )}
              <View style={styles.icons}>
                <Ionicons
                  style={styles.icon}
                  name="lock-closed-outline"
                  size={24}
                  color={Colors.secondary}
                />

                <TextInput
                  secureTextEntry={togle}
                  style={styles.input}
                  placeholder="conform password"
                  name="cpassword"
                  value={password2}
                  onChangeText={inputChangeHandler.bind(this, "password2")}
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
              {message && <Text style={styles.errorText}>{message}</Text>}
              <TouchableOpacity disabled={loading} onPress={handleSubmit}>
                <LinearGradient
                  style={styles.btn}
                  colors={["#000428", "#004e92"]}
                >
                  <Text style={styles.btnText}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.signInTextView}>
                <Text style={styles.haveAccountText}>
                  Alredy have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.signInText}>Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "#fff",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rotait: {
    flex: 1,
    width: "100%",
    height: 300,
    borderBottomRightRadius: 400,
    backgroundColor: Colors.primary,
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
    elevation: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "openSansBold",
    color: Colors.primary,
  },
  label: {
    fontSize: 18,
    color: "#ccc",
    // marginTop: 6,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    fontSize: 18,
    marginTop: 4,
    // paddingBottom: -15,
    color: Colors.secondary,
    paddingLeft: 30,
  },
  btn: {
    width: "100%",
    color: "#fff",
    marginVertical: 20,
    paddingHorizontal: 50,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    shadowOpacity: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
    width: "80%",
    textAlign: "center",
  },
  icon: {
    marginTop: 15,
    marginRight: 10,
    position: "absolute",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
  },
  iconLeft: {
    position: "absolute",
    paddingTop: 20,
    right: 5,
  },
  haveAccountText: {
    fontSize: 18,
    paddingRight: 5,
    textAlign: "center",
    marginTop: 2,
  },

  signInTextView: {
    flexDirection: "row",
    marginTop: 15,
  },
  signInText: {
    textAlign: "center",
    fontSize: 20,
    color: Colors.primary,
  },
  errorText: {
    fontSize: 15,
    color: "red",
    marginTop: 4,
  },
});
