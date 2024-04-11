import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ContributedList } from "@/components/contribute";
import Colors from "@/utils/Colors";

const UserContributed = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 8 }}
    >
      <View className="flex-row items-center justify-between my-2">
        <Text className="text-3xl ms-6">Đóng góp của bạn</Text>
        <TouchableOpacity
          className="border border-darker_primary rounded-full me-6 p-2"
          onPress={() => router.replace("(modals)/form")}
        >
          <Ionicons name="add" size={24} color={Colors.darker_primary} />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-around mx-2.5 my-0.5">
        <View className="flex-row w-max justify-around items-center border border-blue-500 rounded-lg px-1 pe-3">
          <MaterialCommunityIcons
            className="px-1"
            name="upload"
            size={24}
            color={Colors.blue}
          />
          <Text className="text-blue-500">Tổng: 30</Text>
        </View>

        <View className="flex-row w-1/4 justify-around items-center border border-lighter_primary rounded-lg p-3">
          <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={24}
            color={Colors.lighter_primary}
          />
          <Text className="text-lighter_primary">20</Text>
        </View>

        <View className="flex-row w-1/4 justify-around items-center border border-yellow-500 rounded-lg p-3">
          <MaterialCommunityIcons
            name="progress-clock"
            size={24}
            color={Colors.orange}
          />
          <Text className="text-yellow-500">10</Text>
        </View>
      </View>

      <ContributedList />
    </SafeAreaView>
  );
};

export default UserContributed;
