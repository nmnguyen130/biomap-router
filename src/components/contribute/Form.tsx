import React, { useRef } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ToggleButton from "../ToggleButton";
import { useCreatureType } from "@/hooks/CreatureTypeContext";
import { Image } from "expo-image";

interface Props {
  openModal: () => void;
  imageUrl: string | null;
}

const Form: React.FC<Props> = ({ openModal, imageUrl }) => {
  const { selectedType } = useCreatureType();

  const scientificName = useRef("");
  const name = useRef("");
  const characteristic = useRef("");
  const behavior = useRef("");
  const habitat = useRef("");

  const handlerSend = async () => {};

  return (
    <View className="flex">
      <ToggleButton />

      <View>
        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            className="text-gray-800"
            placeholder="Tên khoa học"
            onChangeText={(value) => (scientificName.current = value)}
          ></TextInput>
        </View>

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            className="text-gray-800"
            placeholder="Tên sinh vật"
            onChangeText={(value) => (name.current = value)}
          ></TextInput>
        </View>

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            multiline
            className="w-11/12 text-gray-800"
            placeholder="Đặc điểm"
            onChangeText={(value) => (characteristic.current = value)}
          ></TextInput>
        </View>

        {selectedType === "animal" && (
          <View className="m-3 pb-3 border-b border-gray-400">
            <TextInput
              multiline
              className="w-11/12 text-gray-800"
              placeholder="Tập tính"
              onChangeText={(value) => (behavior.current = value)}
            ></TextInput>
          </View>
        )}

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            multiline
            className="w-11/12 text-gray-800"
            placeholder="Môi trường sống"
            onChangeText={(value) => (habitat.current = value)}
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

        <TouchableOpacity
          onPress={openModal}
          className="self-center justify-center items-center border-primary border-2 rounded-lg w-2/3 aspect-4/3 my-3"
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: "100%",
                aspectRatio: 4 / 3,
                borderRadius: 6,
              }}
            />
          ) : (
            <Ionicons name="image-outline" size={44} color="green" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center rounded-lg bg-primary p-4 mx-2 mt-5"
          onPress={handlerSend}
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;
