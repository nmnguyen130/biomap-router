import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DocumentData, doc, getDoc } from "firebase/firestore";

import CreatureInforHeader from "@/components/content/CreatureInforHeader";
import CreatureInforBody from "@/components/content/CreatureInforBody";
import { db } from "@/utils/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatureInformation = () => {
  const { creatureName, type, provinceName } = useLocalSearchParams<{
    creatureName: string;
    type: string;
    provinceName: string;
  }>();

  const [creatureInfor, setCreatureInfor] = useState<DocumentData>({});

  const getCreatureInfor = useCallback(async () => {
    try {
      if (!type || !creatureName) {
        throw new Error("Missing creature name or type from search params");
      }

      const creatureRef = doc(db, type, creatureName);
      const snapshot = await getDoc(creatureRef);
      const creatureData = snapshot.data();

      if (!creatureData) {
        console.warn("Creature data not found for:", creatureName);
      } else {
        const id = creatureName;
        setCreatureInfor({ ...creatureData, id });
      }
    } catch (error) {
      console.error("Error fetching creature information:", error);
    }
  }, [creatureName, type]);

  useEffect(() => {
    getCreatureInfor();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 p-[10px]">
        <CreatureInforHeader
          creatureData={creatureInfor}
          provinceName={provinceName}
        />
        <CreatureInforBody creatureData={creatureInfor} />
      </View>
    </SafeAreaView>
  );
};

export default CreatureInformation;
