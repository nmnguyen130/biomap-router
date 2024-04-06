import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ContributedList from "@/components/ContributedList";

const UserContributed = () => {
  return (
    <View className="bg-white flex-1 px-4">
      <View className="h-5/6">
        <TouchableOpacity className="self-end mr-6 rounded-full border p-2 border-darker_primary">
          <Ionicons name="add" size={24} color={"rgb(14, 108, 56)"} />
        </TouchableOpacity>
        <Text className=" text-3xl ml-6 mb-2 mt-4">Đóng góp của bạn</Text>

        <View className="flex-row justify-around m-3">
          <View className="flex-row w-1/4 items-center rounded-lg border p-3 border-blue-500">
            <Text className="text-blue-500">Tổng: 30</Text>
          </View>

          <View className="flex-row w-1/4 justify-around items-center rounded-lg border p-3 border-lighter_primary">
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={24}
              color="rgb(74, 174, 112)"
            />
            <Text className="text-lighter_primary">20</Text>
          </View>

          <View className="flex-row w-1/4 justify-around items-center rounded-lg border p-3 border-yellow-500">
            <MaterialCommunityIcons
              name="progress-clock"
              size={24}
              color="rgb(234, 179, 8)"
            />
            <Text className="text-yellow-500">10</Text>
          </View>
        </View>

        <ContributedList />
      </View>
    </View>
  );
};

export default UserContributed;
