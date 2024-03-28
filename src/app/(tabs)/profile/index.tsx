import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-2xl">ProfileScreen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
