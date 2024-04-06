import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ToggleButton from "@/components/ToggleButton";
import { useCreatureType } from "@/hooks/CreatureTypeContext";
import { MaterialIcons } from "@expo/vector-icons";
import ImageUpload from "@/components/ImagePicker";
import ImagePickerModal from "@/components/ImagePickerModal";
import { ModalProvider } from "@/hooks/ModalContext";

const NewContributeForm = () => {
  const { selectedType } = useCreatureType();

  return (
    <ModalProvider>
      <View className="bg-white flex-1 px-4 ">
        <View className="flex-1">
          <View className="flex flex-row w-full items-center justify-center  ">
            <TouchableOpacity className="absolute top-0 left-2 ">
              <Text className="text-lighter_primary">Quay lại</Text>
            </TouchableOpacity>
            <Text className="text-bold text-2xl mb-4">Đóng góp</Text>
          </View>

          <ToggleButton />

          <ScrollView>
            <View className="m-3 pb-3 border-b-[1px] border-gray-400">
              <TextInput
                className="text-gray-800"
                placeholder="Tên khoa học"
              ></TextInput>
            </View>

            <View className="m-3 pb-3 border-b-[1px] border-gray-400">
              <TextInput
                className="text-gray-800"
                placeholder="Tên sinh vật"
              ></TextInput>
            </View>

            <View className="">
              <TouchableOpacity className="m-3 flex-row justify-between items-center pb-3 border-b-[1px] border-gray-400">
                <TextInput
                  multiline
                  editable={false}
                  className="w-11/12 text-gray-800"
                  placeholder="Đặc điểm"
                ></TextInput>
                <MaterialIcons name="navigate-next" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {selectedType === "animal" && (
              <View className="">
                <TouchableOpacity className="m-3 flex-row justify-between items-center pb-3 border-b-[1px] border-gray-400">
                  <TextInput
                    multiline
                    editable={false}
                    className="w-11/12 text-gray-800"
                    placeholder="Tập tính"
                  ></TextInput>
                  <MaterialIcons name="navigate-next" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}

            <View className="">
              <TouchableOpacity className="m-3 flex-row justify-between items-center pb-3 border-b-[1px] border-gray-400">
                <TextInput
                  multiline
                  editable={false}
                  className="w-11/12 text-gray-800"
                  placeholder="Môi trường sống"
                ></TextInput>
                <MaterialIcons name="navigate-next" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity className="m-3 flex-row justify-between items-center pb-3 border-b-[1px] border-gray-400">
                <TextInput
                  multiline
                  editable={false}
                  className="w-11/12 text-gray-800"
                  placeholder="Tỉnh"
                ></TextInput>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <ImageUpload />
          </ScrollView>
        </View>

        <KeyboardAvoidingView className="">
          <TouchableOpacity className="rounded-lg bg-primary p-4 items-center mx-2 ">
            <Text className="text-white">Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <ImagePickerModal />
      </View>
    </ModalProvider>
  );
};

export default NewContributeForm;
