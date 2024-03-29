import { useState } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View className="flex-1 justify-center items-center">
      <LottieView
        style={{ width: 500, height: 500 }}
        source={require("@assets/data/pawLoader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;
