import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Category from "../components/Category";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";
import BasketIcon from "../components/BasketIcon";
import { auth } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userLogged, setUserLogged] = useState(false);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
      *[_type == "featured"]{
        ...,
        stores[]=>{
          dishes[]->,
        }
      }
      `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) =>
      setUserLogged(user ? true : false)
    );

    return authListener;
  });

  return (
    <>
      {userLogged ? <BasketIcon /> : <Text></Text>}
      <SafeAreaView className="bg-white">
        {/* Header */}
        <View className="flex-row p-2 mx-4 items-center space-x-2">
          <Image
            source={require("../assets/app/driver.jpg")}
            className="h-8 w-8 rounded-full p-3"
          />

          <View className="flex-1 w-64">
            <Text className="font-bold text-orange-700 text-xs">
              {userLogged ? `Hello, ${auth.currentUser.email}` : "Welcomback"}
            </Text>

            <Text className="font-bold text-xl">
              Current location <ChevronDownIcon size={20} color="#B2612d" />
            </Text>
          </View>

          {userLogged ? (
            <TouchableOpacity onPress={() => auth.signOut()}>
              <Text className="p-3 bg-orange-600 text-white">Sign out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <UserIcon size={35} color="#B2612d" />
            </TouchableOpacity>
          )}
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 m-4">
          <View className="flex-row space-x-2 p-1 bg-gray-300 flex-1">
            <MagnifyingGlassIcon size={20} color="gray" />
            <TextInput placeholder="Find food" keyboardType="default" />
          </View>
          <AdjustmentsHorizontalIcon size={25} color="#B2612d" />
        </View>

        {/* Body */}
        <ScrollView
          className="bg-gray-100"
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          {/* categories */}
          <Category />

          {/* Featured row */}
          {featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
