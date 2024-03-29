import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef } from "react";

const LoginScreen = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all of fields!");
      return;
    }

    // Login Process
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 items-center justify-center">
        <Image
          resizeMode="cover"
          source={require("@assets/paws-logo.png")}
          className="w-[104px] h-[100px] my-4"
        />
        <Text className="text-[30px] text-center font-bold text-lighter_primary ">
          Bio
          <Text className="text-[30px] text-center font-bold text-yellow-500">
            Map
          </Text>
        </Text>

        <View className="bg-gray-100 w-full p-[10px] mt-[60px] mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons name="email" size={22} color="#128F51" />
          <TextInput
            placeholder="Email"
            className="ml-2 w-full"
            onChangeText={(value) => (emailRef.current = value)}
          />
        </View>

        <View className="bg-gray-100 w-full p-[10px] mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons name="lock" size={22} color="#128F51" />
          <TextInput
            placeholder="Mật khẩu"
            className="ml-2 w-full"
            onChangeText={(value) => (passwordRef.current = value)}
            secureTextEntry
          />

          <TouchableOpacity className="absolute top-[13px] right-3">
            {/* <Octicons name="eye" size={22} color="#128F51" /> */}
            <Octicons name="eye-closed" size={22} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="w-full bg-primary p-[10px] mt-[36px] mb-3 rounded-2xl items-center py-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-[16px] font-bold">Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-lighter_primary mb-4">Quên mật khẩu?</Text>
        </TouchableOpacity>

        <View className="w-11/12 bg-gray-200 h-[1px] rounded-full justify-center items-center my-5">
          <View className="bg-white w-[66px] h-[22px] items-center">
            <Text className="text-[#666666]">hoặc</Text>
          </View>
        </View>

        <TouchableOpacity
          className="w-9/12 bg-white p-[10px] mt-2 rounded-xl border-2 border-gray-200 items-center "
          onPress={() => router.replace("(auth)/signup")}
        >
          <Text className="text-black text-[16px] ">Tạo tài khoản mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;