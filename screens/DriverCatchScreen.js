import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const DriverCatchScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      alert("Wait for store");
      navigation.navigate("StoreCook");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-orange-500">
      <Animatable.Image
        source={require("../assets/app/food_delivery.gif")}
        animation="fadeIn"
        iterationCount={1}
        className="h-90 w-90"
      />
      <Animatable.Text
        animation="fadeIn"
        iterationCount={1}
        className="text-white text-lg font-bold bg-orange-500 my-3"
      >
        Finding driver
      </Animatable.Text>
      <Progress.CircleSnail size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default DriverCatchScreen;
