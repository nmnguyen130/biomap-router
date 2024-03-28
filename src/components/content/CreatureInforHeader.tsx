import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { DocumentData } from "firebase/firestore";

interface Props {
  creatureData: DocumentData;
  provinceName?: string;
}

const CreatureInforHeader: React.FC<Props> = ({
  creatureData,
  provinceName,
}) => {
  return (
    <View className="flex-row items-center justify-between mx-[2px]">
      <View className="flex-row items-center justify-between gap-2">
        <TouchableOpacity className="bg-[#D7E0DD] border-[1px] border-[#B8C6C1] border-solid rounded-md">
          <Text className="mx-[8px] text-[#1D3A2F]">{creatureData.id}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#FFF9F2] border-[1px] border-[#EECEB0] border-solid rounded-md">
          <Text className="mx-[8px] text-[#CD7B2E]">{creatureData.name}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text className="mx-[2px] text-[22px]">{provinceName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatureInforHeader;
