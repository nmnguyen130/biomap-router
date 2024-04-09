import React from "react";
import { View } from "react-native";
import { Loader } from "@/components";

const SplashScreen = () => {
  return (
    <View className="flex-1">
      <Loader width={500} height={500} />
    </View>
  );
};

export default SplashScreen;
