import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  provinceName: string;
}

const ProvinceTag: React.FC<Props> = ({ provinceName }) => {
  const [isCheck, setIsCheck] = useState(false);

  const handleCheckTag = () => {
    setIsCheck((prev) => !prev);
  };

  return (
    <TouchableOpacity
      onPress={handleCheckTag}
      className="justify-center items-center rounded-lg border-primary py-2 px-16 my-2"
      style={{ borderWidth: isCheck === true ? 2 : 1 }}
    >
      <Text className="text-lg">{provinceName}</Text>
      {isCheck && (
        <View className="bg-primary absolute top-[-1] right-0  px-2 rounded-bl-2xl rounded-tr-md">
          <MaterialIcons name="check" size={20} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProvinceTag;
