import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";

import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
import StartUpScreen from "../screens/StartUpScreen";

const RootNavigator = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: userInfoRegister } = userRegister;
  const didTryAutoLogIn = useSelector(
    (state) => state.userLogin.didTryAutoLogin
  );
  return (
    <NavigationContainer>
      {userInfo && <DrawerNavigator />}
      {!userInfo && didTryAutoLogIn && <AuthNavigator />}
      {!userInfo && !didTryAutoLogIn && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default RootNavigator;
