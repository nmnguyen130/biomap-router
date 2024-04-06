import React from "react";
import { View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ToggleButton from "../ToggleButton";
import { useCreatureType } from "@/hooks/CreatureTypeContext";
import ImagePicker from "../ImagePicker";

const Form = () => {
  const { selectedType } = useCreatureType();

  return (
    <View className="flex">
      <ToggleButton />

      <ScrollView>
        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            className="text-gray-800"
            placeholder="Tên khoa học"
          ></TextInput>
        </View>

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            className="text-gray-800"
            placeholder="Tên sinh vật"
          ></TextInput>
        </View>

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            multiline
            className="w-11/12 text-gray-800"
            placeholder="Đặc điểm"
          ></TextInput>
        </View>

        {selectedType === "animal" && (
          <View className="m-3 pb-3 border-b border-gray-400">
            <TextInput
              multiline
              className="w-11/12 text-gray-800"
              placeholder="Tập tính"
            ></TextInput>
          </View>
        )}

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            multiline
            className="w-11/12 text-gray-800"
            placeholder="Môi trường sống"
          ></TextInput>
        </View>

        <TouchableOpacity className="m-3 flex-row justify-between items-center pb-3 border-b-[1px] border-gray-400">
          <TextInput
            multiline
            editable={false}
            className="w-11/12 text-gray-800"
            placeholder="Tỉnh"
          ></TextInput>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </TouchableOpacity>

        <ImagePicker />
      </ScrollView>
    </View>
  );
};

export default Form;
