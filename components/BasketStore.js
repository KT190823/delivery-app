import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketTotal, selectBasketItems } from "../features/basketSlices";
import { useNavigation } from "@react-navigation/native";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { auth } from "../firebase";

const BasketStore = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const totalBasket = useSelector(selectBasketTotal);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) =>
      setUserLogged(user ? true : false)
    );

    return authListener;
  });

  if (items.length === 0) return null;

  handlePurchase = () => {
    if (userLogged) {
      navigation.navigate("Basket");
    } else {
      alert("You need to login");
      navigation.navigate("Login");
    }
  };

  return (
    <View className="absolute bottom-0 w-full z-50">
      <View className="flex-row bg-white shadow-xl">
        <TouchableOpacity className="flex-row pt-2 justify-around w-9/12">
          <View className="flex-row">
            <ShoppingCartIcon size={30} color="#B2612d" />
            <Text className="text-white bg-orange-700 rounded-xl pd-3 h-4 w-4 text-center text-xs">
              {items.length}
            </Text>
          </View>
          <Text>{totalBasket}đ</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            className="bg-orange-600 w-full h-full p-3"
            onPress={handlePurchase}
          >
            <Text className="text-white">Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BasketStore;
