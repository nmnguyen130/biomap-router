import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/AuthContext";
import { Dialog } from "@/components";
import { MessageType } from "@/components/Dialog";

const ProfileScreen = () => {
  const { logout } = useAuth();
  const [isShow, setIsShow] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TouchableOpacity onPress={handleLogout}>
        <Text className="text-2xl">Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-10" onPress={() => setIsShow(true)}>
        <Text className="text-2xl">Open Dialog</Text>
      </TouchableOpacity>

      <Dialog
        dialogType={MessageType.Success}
        isVisible={isShow}
        onClose={() => setIsShow(false)}
        title="Success!"
        content="Login success"
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
