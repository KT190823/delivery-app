import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MapPinIcon, StarIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const StoreCard = ({
  id,
  imgUri,
  title,
  rating,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mr-2 bg-white pb-2"
      onPress={() => {
        navigation.navigate("Store", {
          id,
          imgUri,
          title,
          rating,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
    >
      <Image source={{ uri: urlFor(imgUri).url() }} className="h-28 w-48" />
      <View className="px-2">
        <Text className="font-bold text-lg">{title}</Text>
        <View className="flex-row ">
          <StarIcon size={18} color="#268746" />
          <Text className="text-sm text-green-600">{rating}</Text>
        </View>

        <View className="flex-row items-center">
          <MapPinIcon opacity={0.8} color="gray" size={18} />
          <Text className="text-gray-600">
            {long < 3 ? <Text>Nearby.</Text> : <Text>{long} km</Text>} {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoreCard;
