import { useRef, useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";

import { Button, Dialog, ToggleButton } from "@/components";
import { useAuth } from "@/hooks/AuthContext";
import { useCreatureType } from "@/hooks/CreatureTypeContext";
import { addFormData } from "@/api/FormApi";
import { MessageType } from "../Dialog";

interface Props {
  openModal: () => void;
  imageUrl: string | null;
}

const Form: React.FC<Props> = ({ openModal, imageUrl }) => {
  const { selectedType } = useCreatureType();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [dialogType, setDialogType] = useState(MessageType.Success);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isShowDialog, setIsShowDialog] = useState(false);

  const scientificName = useRef("");
  const name = useRef("");
  const characteristic = useRef("");
  const behavior = useRef("");
  const habitat = useRef("");

  const options = { timeZone: "Asia/Ho_Chi_Minh", hour12: false };

  const handlerSend = async () => {
    if (!name.current && !imageUrl) {
      setDialogType(MessageType.Alert);
      setTitle("Đóng góp");
      setContent("Tên/Hình ảnh không được để trống!");
      setIsShowDialog(true);
      return;
    }

    const today = new Date().toLocaleString("en-US", options);

    const data = {
      userId: user?.userId,
      scientificName: scientificName.current,
      name: name.current,
      characteristic: characteristic.current,
      behavior: behavior.current,
      habitat: habitat.current,
      imageUrl: imageUrl as unknown as string,
      type: selectedType,
      submissionDate: today,
      status: "pending",
    };

    const response = await addFormData(data);

    if (response.success) {
      setDialogType(MessageType.Success);
      setTitle("Thành công!");
      setContent("Đã thêm mới dữ liệu.");
      setIsShowDialog(true);
      router.replace("(tabs)/contribute");
    }
  };

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

        <View className="mx-2">
          <Button onPress={handlerSend} value="Gửi" />
        </View>
      </View>

      <Dialog
        dialogType={dialogType}
        isVisible={isShowDialog}
        onClose={() => setIsShowDialog(false)}
        title={title}
        content={content}
      />
    </View>
  );
};

export default Form;
