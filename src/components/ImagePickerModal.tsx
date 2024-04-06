import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSheet } from "@/hooks/ModalContext";

const ImagePickerModal = () => {
  const { show, setShow, toggleShow } = useSheet();

  if (show)
    return (
      <>
        {
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            ]}
          />
        }
        <View>
          <Modal transparent={true}>
            <View className="flex-1 bg-lighter_primary mx-6 my-[300px] justify-center items-center rounded-lg">
              <Text className="text-2xl top-4 absolute text-gray-800">
                Choose an option
              </Text>
              <TouchableOpacity
                onPress={toggleShow}
                className="absolute top-2 right-2"
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <View className="flex-row items-center w-full justify-evenly pt-6">
                <TouchableOpacity className="items-center rounded-md w-[80px] border-[1px] p-3 bg-yellow-300">
                  <Ionicons name="camera-outline" size={24} color="black" />
                  <Text>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center rounded-md w-[80px] border-[1px] p-3 bg-yellow-300">
                  <Ionicons name="image-outline" size={24} color="black" />
                  <Text>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center rounded-md w-[80px] border-[1px] p-3 bg-yellow-300">
                  <Ionicons name="trash-outline" size={24} color="black" />
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
};

export default ImagePickerModal;
