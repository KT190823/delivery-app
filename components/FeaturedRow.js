import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import StoreCard from "./StoreCard";
import client from "../sanity";
import { data } from "autoprefixer";

const FeaturedRow = ({ id, title, description }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
      *[_type == "featured" && _id== $id]{
        stores[]->{
          ...,
          dishes[]->{
            ...,
          },
          type->{
            ...,
             
          }
        },
      }[0]
      `,
        { id }
      )
      .then((data) => setStores(data?.stores));
  }, []);

  return (
    <View>
      <View className="bg-white my-3 py-3">
        <View className="flex-row items-center justify-between px-3 ">
          <Text className="font-bold text-lg">{title}</Text>
          <ArrowRightIcon size={20} color="#B2612d" />
        </View>

        <Text className="px-3 text-gray-400">{description}</Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {/* StoreCard */}
        {stores?.map((store, index) => {
          return (
            <StoreCard
              key={index}
              id={store._id}
              imgUri={store.image}
              title={store.name}
              rating={store.rating}
              address={store.address}
              short_description={store.short_description}
              dishes={store.dishes}
              genre={store.type?.name}
              long={store.long}
              lat={store.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
