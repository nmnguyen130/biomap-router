import { View, Text } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";

interface Props {
  creatureData: DocumentData;
}

const CreatureInforBody: React.FC<Props> = ({ creatureData }) => {
  return (
    <View className="flex-1 items-center">
      {/* <Image
        className="w-[96%] h-[30%] my-4"
        source={require("../../../assets/Aquila_clanga.jpg")}
      />

      <FlatList
        data={creatureData}
        renderItem={({ item }) => (
          <View className="mx-[6px] my-2">
            <Text className="font-bold">
              {item.id}: <Text className="font-normal">{item.content}</Text>
            </Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1, zIndex: 10000 }}
        keyExtractor={(item) => item.id}
      /> */}
    </View>
  );
};

export default CreatureInforBody;
