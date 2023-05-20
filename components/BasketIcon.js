import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlices";
import { useNavigation } from "@react-navigation/native";
import { ShoppingCartIcon } from "react-native-heroicons/outline";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();

  if (items.length === 0) return null;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Basket")}
      className="absolute bottom-3 right-3 z-50 bg-orange-500 border-2 border-solid rounded-full  p-1"
    >
      <View className="flex-row">
        <ShoppingCartIcon size={30} color="white" />
        <Text className="text-white">{items.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BasketIcon;
