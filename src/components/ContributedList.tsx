import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const contributedData = [
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
  { scienceName: "Ursus thibetanus" },
];

const ContributedList = () => {
  return (
    <View className="mx-2 my-2 h-5/6">
      <FlatList
        data={contributedData}
        renderItem={({ item }) => (
          <>
            <View className="border-2 border-lighter_primary rounded-2xl ml-4 mr-9 my-3  ">
              <View className="p-4">
                <Text className="font-medium text-lg">{item.scienceName}</Text>
                <Text className="text-gray-400 text-xs">
                  Posted 64 minutes ago
                </Text>
              </View>
            </View>
            <View className="bg-lighter_primary  rounded-full absolute right-4 top-6 w-12 h-12 items-center justify-center">
              <TouchableOpacity className="bg-primary items-center justify-center h-11 w-11 rounded-full  ">
                <MaterialIcons
                  name="keyboard-double-arrow-right"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default ContributedList;
