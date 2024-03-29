import { View, Text } from "react-native";
import React from "react";
import Loader from "@/components/Loader";

const SplashScreen = () => {
  return (
    <View className="flex-1">
      <Loader />
    </View>
  );
};

export default SplashScreen;
