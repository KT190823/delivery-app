import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const StoreCookScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      alert("Wait for driver");
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-red-300">
      <Animatable.Image
        source={require("../assets/app/StoreCook.gif")}
        animation="fadeIn"
        iterationCount={1}
        className="h-70 w-82"
      />
      <Animatable.Text
        animation="fadeIn"
        iterationCount={1}
        className="text-white text-lg font-bold bg-red-300 my-3"
      >
        Store is cooking
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default StoreCookScreen;
