import { Image, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSheet } from "@/hooks/ModalContext";

const ImagePicker = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { setShow } = useSheet();

  const pickImage = () => {};

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="self-center justify-center items-center border-primary border-[3px] rounded-lg w-[230px] h-[170px]"
      >
        {/* <Image
          source={require("../../assets/Aquila_clanga.jpg")}
          className="self-center rounded-md w-[230px] h-[170px]"
        /> */}

        <Ionicons name="image-outline" size={44} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;
