import { View } from "react-native";

import Button from "./Button";
import { useCreatureType } from "@/hooks/CreatureTypeContext";

const ToggleButton = () => {
  const { selectedType, toggleCreatureType } = useCreatureType();

  const handleToggle = (newType: string) => {
    if (selectedType !== newType) {
      toggleCreatureType();
    }
  };

  return (
    <View className="flex mb-4">
      <View className="h-[49px] border-[0.5px] rounded-3xl flex-row mx-[10px]">
        <Button
          type={"animal"}
          onPress={() => handleToggle("animal")}
          isSelected={selectedType === "animal"}
        />

        <Button
          type={"plant"}
          onPress={() => handleToggle("plant")}
          isSelected={selectedType === "plant"}
        />
      </View>
    </View>
  );
};

export default ToggleButton;
