import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemWithId,
} from "../features/basketSlices";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const pickItems = useSelector((state) => selectBasketItemWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasket = () => {
    if (!pickItems.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsPressed(!isPressed);
        }}
        className={`${isPressed && "border-b-0"}`}
      >
        <View className="flex-row justify-between my-3 border-solid border-gray-200 border-2 p-2">
          <View>
            <Text className="font-bold text-lg">{name}</Text>
            <Text className="w-56 text-xs">{description}</Text>
            <Text className="mt-3 text-sm">{price}đ</Text>
          </View>

          <Image
            source={{ uri: urlFor(image).url() }}
            className="w-20 h-20 mt-2"
          />
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View>
          <View className="flex-row space-x-3">
            <TouchableOpacity>
              <MinusCircleIcon
                size={30}
                disabled={!pickItems.length}
                color={pickItems.length > 0 ? "#3928bd" : "gray"}
                onPress={removeItemFromBasket}
              />
            </TouchableOpacity>
            <Text className="text-lg">{pickItems.length}</Text>
            <TouchableOpacity>
              <PlusCircleIcon
                size={30}
                color="#3928bd"
                onPress={addItemToBasket}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
