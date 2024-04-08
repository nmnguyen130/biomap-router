import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { CreatureTypeProvider } from "@/hooks/CreatureTypeContext";
import ImagePickerModal from "@/components/ImagePickerModal";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "@/components/contribute/Form";

const NewContributeForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>("");

  const uploadImage = async (mode: string) => {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (mode === "camera") {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.canceled) {
        // Save Image
        await saveImage(result);
      }
    } catch (error) {
      alert("Error accessing your Camera! " + (error as Error).message);
      setModalVisible(false);
    }
  };

  const saveImage = async (
    image: ImagePicker.ImagePickerSuccessResult | null
  ) => {
    try {
      if (image) {
        // Upload displayed image
        setImageUrl(image.assets[0].uri);
        setModalVisible(false);
      } else {
        setImageUrl(null);
      }
    } catch (error) {
      throw error;
    }
  };

  const removeImage = async () => {
    try {
      saveImage(null);
    } catch (error) {
      alert((error as Error).message);
    }
    setModalVisible(false);
  };

  return (
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

      <ScrollView>
        <CreatureTypeProvider>
          <Form openModal={() => setModalVisible(true)} imageUrl={imageUrl} />
        </CreatureTypeProvider>
      </ScrollView>

      <ImagePickerModal
        modalVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onCameraPress={() => uploadImage("camera")}
        onLibraryPress={() => uploadImage("gallery")}
        onRemovePress={() => removeImage()}
      />
    </SafeAreaView>
  );
};

export default NewContributeForm;
