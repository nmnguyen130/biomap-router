import { useRef } from "react";
import { View, FlatList, Modal, StyleSheet } from "react-native";
import ProvinceTag from "./ProvinceTag";
import Input from "./Input";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";

const data = [
  "Quảng Nam",
  "Quảng Nam",
  "Quảng Nam",
  "Bà Rịa - Vũng Tàu",
  "Quảng Nam",
  "Quảng Nam",
  "Quảng Nam",
  "Quảng Nam",
  "Quảng Nam",
  "Quảng Nam",
  "Quảng Nam",
];

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const CheckList: React.FC<Props> = ({ isVisible, onClose }) => {
  const searchContent = useRef("");

  if (isVisible) {
    return (
      <>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          ]}
        />
        <View>
          <Modal transparent visible={isVisible} animationType="fade">
            <View className="flex-1 justify-center items-center mx-8 my-16 bg-white rounded-xl">
              <Input
                leftIcon={
                  <MaterialIcons name="search" size={24} color="black" />
                }
                placeholder="Nhập tỉnh muốn tìm kiếm"
                onChangeText={(value) => (searchContent.current = value)}
              />

              <FlatList
                data={data}
                renderItem={({ item }) => <ProvinceTag provinceName={item} />}
              />

              <View className="w-full items-center my-2">
                <Button width="half" onPress={onClose} value="Xong" />
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
};

export default CheckList;
