import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketStore from "../components/BasketStore";
import { useDispatch } from "react-redux";
import { setStore } from "../features/storeSlices";

const StoreScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  function scrollViewSizeChanged(height) {
    // y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
    scrollViewRef.current?.scrollTo({ y: height, animated: true });
  }
  const {
    params: {
      id,
      imgUri,
      title,
      rating,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    dispatch(
      setStore({
        id,
        imgUri,
        title,
        rating,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  return (
    <>
      <BasketStore />
      <SafeAreaView className="bg-slate-200">
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={(width, height) => {
            scrollViewSizeChanged(height);
          }}
        >
          <View className="relative ">
            <Image
              source={{ uri: urlFor(imgUri).url() }}
              className="w-screen h-52"
            />
            <TouchableOpacity
              className="absolute top-3 left-6"
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowLeftIcon size={30} color="#B2612d" />
            </TouchableOpacity>
          </View>

          <View className="text-center pb-4">
            <View className="px-4 pt-4 bg-white relative bottom-4 w-80 ml-5 rounded-lg shadow">
              <Text className="font-bold text-3xl text-center">{title}</Text>
              <View className="flex-row space-x-3 justify-center py-3">
                <Text className="text-green-700 text-sm">
                  <StarIcon size={15} color="#268746" /> {rating}
                </Text>
                <Text className="text-green-700 text-sm">
                  <MapPinIcon size={15} color="#268746" /> {long}km
                </Text>
                <Text className="text-green-700 text-sm">{address}</Text>
              </View>
            </View>

            <View className="bg-slate-200">
              <Text className="text-center text-gray-600 text-sm font-bold">
                {short_description}
              </Text>
            </View>
          </View>

          <View className="bg-white h-screen p-3">
            <Text className="font-bold text-xl">Menu</Text>
            {/* Dishes */}
            {dishes.map((dish, index) => (
              <DishRow
                key={index}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default StoreScreen;
