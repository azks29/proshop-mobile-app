import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { StripeProvider } from "@stripe/stripe-react-native";

import store from "./store/store";
import RootNavigator from "./navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [loaded] = useFonts({
    openSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    openSans: require("./assets/fonts/OpenSans-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <StripeProvider publishableKey="pk_test_51LdqLoL9sMNHp5hCVskV7vCJp4boJrYtS9sprlXnCBqbrpxa9YLD2NeBW8xfU6oH2TyEznEPIic6ONVT5x5Eoidg005bIVMRdT">
          <RootNavigator />
        </StripeProvider>
      </Provider>
    </>
  );
}
