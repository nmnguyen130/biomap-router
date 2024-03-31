import { View, Text } from "react-native";
import React from "react";
import Loader from "@/components/Loader";

const SplashScreen = () => {
  return (
    <View className="flex-1">
      <Loader width={500} height={500} />
    </View>
  );
};

export default SplashScreen;
