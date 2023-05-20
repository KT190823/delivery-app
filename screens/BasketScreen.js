import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectStore } from "../features/storeSlices";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketTotal,
  selectBasketItems,
} from "../features/basketSlices";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";

const BasketScreen = () => {
  const navigation = useNavigation();
  const store = useSelector(selectStore);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupItemsBasket, setGroupItemsBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemsBasket(groupItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#ff471a] bg-white shadow-lg">
          <View>
            <Image
              source={require("../assets/app/basket.png")}
              className="w-10 h-10 absolute left-5"
            />
            <Text className="text-lg font-bold text-center">Payment Page</Text>
            <Text className="text-gray-400 text-center">
              {store && store.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute right-3 top-5"
          >
            <XCircleIcon size={30} color="orange" />
          </TouchableOpacity>
        </View>

        <ScrollView className="my-5 px-5 bg-white">
          <Text className="text-gray-400 font-bold text-lg">Your basket</Text>
          {Object.entries(groupItemsBasket).map(([key, items]) => (
            <View key={key} className="flex-row justify-between">
              <View className="flex-row space-x-2">
                <Text className="text-gray-400 text-xs">{items.length}x</Text>
                <Text>{items[0]?.name}</Text>
              </View>
              <View className="flex-row space-x-2">
                <Text>{items[0]?.price}đ</Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  <MinusCircleIcon size={20} color="orange" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            onPress={navigation.goBack}
            className="flex-row my-3 space-x-1"
          >
            <PlusCircleIcon size={20} color="orange" />
            <Text className="text-orange-500">Add more food</Text>
          </TouchableOpacity>
        </ScrollView>

        <View className="px-5 bg-white pt-3">
          <View className="flex-row space-x-3">
            <Text className="text-gray-400 text-sm">Total food:</Text>
            <Text className="text-gray-400 text-sm">{basketTotal}đ</Text>
          </View>
          <View className="flex-row space-x-3">
            <Text className="text-gray-400 text-sm">Total discount:</Text>
            <Text className="text-gray-400 text-sm">0đ</Text>
          </View>
          <View className="flex-row space-x-3">
            <Text className="text-gray-400 text-sm">Delivery fee:</Text>
            <Text className="text-gray-400 text-sm">18000đ</Text>
          </View>
          <View className="flex-row space-x-3">
            <Text className="font-bold text-sm">Total:</Text>
            <Text className="font-bold text-sm">{basketTotal + 18000}đ</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("DriverCatchScreen")}
            className="border-2 border-solid rounded-xl bg-orange-500 py-2 my-2"
          >
            <Text className=" font-bold text-white text-center text-base">
              Order now - {basketTotal + 18000}đ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
