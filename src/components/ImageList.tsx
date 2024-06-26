import { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { DocumentData, doc, getDoc } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import { router } from "expo-router";

import Loader from "./Loader";
import { useCreatureType } from "@/hooks/CreatureTypeContext";
import { getURLFromCache, saveURLToCache } from "@/utils/Storage";
import { db, storage } from "@/utils/firebase";

interface Props {
  creatureList: DocumentData;
  provinceName?: string;
}

const ImageList: React.FC<Props> = ({ creatureList, provinceName }) => {
  const { selectedType } = useCreatureType();

  const [creatureDatas, setCreatureDatas] = useState<{
    animalList: { id: string; name: string; imageURL: string }[];
    plantList: { id: string; name: string; imageURL: string }[];
  }>({
    animalList: [],
    plantList: [],
  });

  const fetchCreatureData = async (creatureList: string[], table: string) => {
    return Promise.all(
      creatureList.map(async (data: string) => {
        const cachedImageURL = await getURLFromCache(`URL_${data}`);

        if (cachedImageURL) {
          // If the imageURL is cached, use it directly
          return cachedImageURL;
        } else {
          const creatureRef = doc(db, table, data);
          const snapshot = await getDoc(creatureRef);
          const creatureData = snapshot.data();

          if (creatureData) {
            const imageRef = ref(storage, `${creatureData.image_url}`);
            const imageUrl = await getDownloadURL(imageRef);

            // Cache the URL in AsyncStorage
            saveURLToCache(
              `URL_${data}`,
              JSON.stringify({
                id: data,
                name: creatureData.name,
                imageURL: imageUrl,
              })
            );

            return {
              id: data,
              name: creatureData.name,
              imageURL: imageUrl,
            };
          }
        }
        return {
          id: "",
          name: "",
          imageURL: "",
        };
      })
    ).then((data) => data.filter(Boolean));
  };

  const getCreatureCard = useMemo(() => {
    return async () => {
      const { animal_list, plant_list } = creatureList;

      const animalData = await fetchCreatureData(animal_list, "Animals");
      const plantData = await fetchCreatureData(plant_list, "Plants");

      setCreatureDatas({
        animalList: animalData,
        plantList: plantData,
      });
    };
  }, [creatureList]);

  useEffect(() => {
    getCreatureCard();
  }, [getCreatureCard]);

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
              className="mx-4 my-2.5 pb-2.5 rounded-md items-center bg-primary"
              onPress={() => {
                router.push({
                  pathname: "(data)/[creatureName]",
                  params: {
                    creatureName: item.id,
                    type: selectedType === "animal" ? "Animals" : "Plants",
                    provinceName: provinceName,
                  },
                });
              }}
            >
              <Image
                source={{ uri: item.imageURL }}
                style={{ height: 200, width: "100%", borderRadius: 6 }}
              />
              <Text className="text-base pt-1.5 text-yellow-300">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View className="h-0.5 mx-4 bg-gray-300"></View>
          )}
        />
      ) : (
        <Loader width={450} height={450} />
      )}
    </View>
  );
};

export default ImageList;
