import { StatusBar } from "expo-status-bar";
import { Modal, Text, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import "react-native-url-polyfill/auto";
import StoreScreen from "./screens/StoreScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BasketScreen from "./screens/BasketScreen";
import DriverCatchScreen from "./screens/DriverCatchScreen";
import StoreCookScreen from "./screens/StoreCookScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import LoginScreen from "./screens/LoginScreen";
import SigninScreen from "./screens/SigninScreen";

const Stack = createNativeStackNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            className="bg-gray-300"
          />
          <Stack.Screen
            name="Store"
            component={StoreScreen}
            className="bg-gray-300"
          />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            className="bg-gray-300"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="DriverCatchScreen"
            component={DriverCatchScreen}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
          <Stack.Screen
            name="StoreCook"
            component={StoreCookScreen}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={SigninScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
