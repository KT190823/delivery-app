import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

const CategoryCard = ({ imageUri, title }) => {
  return (
    <TouchableOpacity className="mr-2">
      <Image source={{ uri: urlFor(imageUri).url() }} className="h-20 w-32" />
      <Text className="font-bold absolute bottom-1 left-1 text-blue-500">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
