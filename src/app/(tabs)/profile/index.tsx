import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const ProfileScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text className="text-4xl font-bold">ProfileScreen</Text>
      <Link className="text-2xl" href={"(auth)/login"}>
        Login
      </Link>
    </SafeAreaView>
  );
};

export default ProfileScreen;
