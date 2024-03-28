import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { DocumentData } from "firebase/firestore";

import { useCreatureType } from "@/hooks/CreatureTypeContext";
import Loader from "./Loader";

interface Props {
  creatureList: DocumentData;
}

const ImageList: React.FC<Props> = ({ creatureList }) => {
  const { selectedType } = useCreatureType();

  const [creatureDatas, setCreatureDatas] = useState<{
    animalList: { id: string; name: string; imageURL: string }[];
    plantList: { id: string; name: string; imageURL: string }[];
  }>({
    animalList: [],
    plantList: [],
  });

  const getSelectedCreatureData = () => {
    return selectedType === "animal"
      ? creatureDatas.animalList
      : creatureDatas.plantList;
  };

  return (
    <View className="flex-1 mb-3">
      {getSelectedCreatureData().length !== 0 ? (
        <FlatList
          data={getSelectedCreatureData()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mx-4 my-[10px] pb-[10px] rounded-md items-center bg-primary"
              onPress={() => {}}
            >
              <Image
                source={{ uri: item.imageURL }}
                style={{ height: 200, width: "100%", borderRadius: 6 }}
              />
              <Text className="text-[16px] pt-[6px] text-yellow-300">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View className="h-[2px] mx-4 bg-gray-300"></View>
          )}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default ImageList;
