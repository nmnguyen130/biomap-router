import { View, Text, FlatList } from "react-native";
import React from "react";
import { DocumentData } from "@firebase/firestore";

import { Image } from "expo-image";

interface Props {
  creatureData: DocumentData;
}

const CreatureInforBody: React.FC<Props> = ({ creatureData }) => {
  const getRenderInformation = () => {
    return [
      { id: "Characteristic", content: creatureData.characteristic },
      { id: "Behavior", content: creatureData.behavior },
      { id: "Habitat", content: creatureData.habitat },
    ];
  };

  return (
    <View className="flex-1 items-center">
      <Image
        style={{ width: "96%", height: "30%", marginTop: 12, borderRadius: 10 }}
        source={{ uri: creatureData.image_url }}
      />

      <FlatList
        data={getRenderInformation()}
        renderItem={({ item }) => (
          <View className="mx-[6px] my-2">
            <Text className="font-bold">
              {item.id}: <Text className="font-normal">{item.content}</Text>
            </Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1, zIndex: 10000 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CreatureInforBody;
