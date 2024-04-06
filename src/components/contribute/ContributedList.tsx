import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
    <View className="h-5/6 m-2">
      <FlatList
        data={contributedData}
        renderItem={({ item }) => (
          <>
            <View className="border-2 border-lighter_primary rounded-2xl ms-4 me-9 my-2.5">
              <View className="p-3.5">
                <Text className="text-lg font-medium">{item.scienceName}</Text>
                <Text className="text-gray-400 text-xs">
                  Posted 64 minutes ago
                </Text>
              </View>
            </View>
            <View className="bg-lighter_primary rounded-full absolute right-4 top-6 w-12 h-12 items-center justify-center">
              <TouchableOpacity className="bg-primary items-center justify-center h-11 w-11 rounded-full">
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
