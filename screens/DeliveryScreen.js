import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectStore } from "../features/storeSlices";
import { SafeAreaView } from "react-native-safe-area-context";
import { PhoneIcon, XMarkIcon } from "react-native-heroicons/outline";
import { useProgress } from "../components/Hooks/useProgress";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const store = useSelector(selectStore);
  const progress = useProgress();
  return (
    <View className="bg-blue-400 flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-light">Other help</Text>
        </View>

        <View className="bg-white mx-5 my-3 rounded-md p-6 flex-row justify-between">
          <Image
            source={require("../assets/app/delivery.jpg")}
            className="w-20 h-20"
          />
          <View>
            <Animatable.Text
              animation="lightSpeedIn"
              className="text-base font-bold my-auto"
            >
              Your order is on the way
            </Animatable.Text>
            <Progress.Bar progress={30} indeterminate={true} width={200} />
          </View>
        </View>
      </SafeAreaView>

      <MapView className="flex-1 mt-10 z-0" mapType="terrain">
        <Marker
          coordinate={{
            latitude: store.lat,
            longitude: store.long,
          }}
          title={store.title}
          identifier="origin"
          pinColor="brown"
        />
      </MapView>

      <SafeAreaView className="bg-blue-500 h-24 pb-5 px-5  flex-row justify-between items-center ">
        <View className="flex-row space-x-3">
          <Image
            source={require("../assets/app/driver.jpg")}
            className="h-10 w-10 rounded-full p-3"
          />
          <View>
            <Text className="text-white text-xs">Driver:</Text>
            <Text className="text-white text-lg font-bold">Khai Tran</Text>
          </View>
        </View>
        <TouchableOpacity>
          <PhoneIcon size={30} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
