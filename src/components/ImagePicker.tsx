import { Image, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSheet } from "@/hooks/ModalContext";

const ImagePicker = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { setShow } = useSheet();

  const pickImage = () => {};

  return (
    <TouchableOpacity
      onPress={() => setShow(true)}
      className="self-center justify-center items-center border-primary border-2 rounded-lg w-2/3 h-44 my-3"
    >
      {/* <Image
          source={require("@assets/Aquila_clanga.jpg")}
          className="self-center rounded-md w-[230px] h-[170px]"
        /> */}

      <Ionicons name="image-outline" size={44} color="green" />
    </TouchableOpacity>
  );
};

export default ImagePicker;
