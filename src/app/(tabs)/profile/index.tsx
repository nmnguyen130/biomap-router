import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { CheckList } from "@/components";
import { useState } from "react";

const ProfileScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="h-1/3 items-center bg-lighter_primary z-10"></View>
      <CheckList isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
