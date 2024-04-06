import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { CreatureTypeProvider } from "@/hooks/CreatureTypeContext";
import ImagePickerModal from "@/components/ImagePickerModal";
import { ModalProvider } from "@/hooks/ModalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "@/components/contribute/Form";

const NewContributeForm = () => {
  return (
    <ModalProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 4 }}
      >
        <View className="flex-row w-full items-center justify-center mt-3 mb-6">
          <TouchableOpacity
            className="absolute top-0.5 left-2"
            onPress={() => router.replace("contribute")}
          >
            <Text className="text-lighter_primary text-xl">Quay lại</Text>
          </TouchableOpacity>
          <Text className="text-bold text-3xl">Đóng góp</Text>
        </View>

        <CreatureTypeProvider>
          <Form />
        </CreatureTypeProvider>

        <TouchableOpacity className="items-center rounded-lg bg-primary p-4 mx-2 mt-5">
          <Text className="text-white">Send</Text>
        </TouchableOpacity>

        <ImagePickerModal />
      </SafeAreaView>
    </ModalProvider>
  );
};

export default NewContributeForm;
