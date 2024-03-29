import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef } from "react";

const SignupScreen = () => {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPassRef = useRef("");

  const handleRegister = () => {
    if (
      !usernameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPassRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the fields!");
      return;
    }

    // Register Process
  };

  return (
    <View className="flex-1 p-[25px] bg-white">
      <View className="flex-1 items-center justify-center">
        <Image
          resizeMode="cover"
          source={require("../../../assets/paws-logo.png")}
          className="w-[104px] h-[100px] my-4"
        />

        <Text className="text-[30px] text-center font-bold text-lighter_primary ">
          Bio
          <Text className="text-[30px] text-center font-bold text-yellow-500">
            Map
          </Text>
        </Text>

        <View className="bg-gray-100 w-full p-[10px] mt-[60px] mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color="#128F51"
          />
          <TextInput
            placeholder="Tên tài khoản"
            className="ml-2 w-full"
            onChangeText={(value) => (usernameRef.current = value)}
          />
        </View>

        <View className="bg-gray-100 w-full p-[10px] mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color="#128F51"
          />
          <TextInput
            placeholder="Email"
            className="ml-2 w-full"
            onChangeText={(value) => (emailRef.current = value)}
          />
        </View>

        <View className="bg-gray-100 w-full p-[10px] mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons
            name="lock-outline"
            size={22}
            color="#128F51"
          />
          <TextInput
            placeholder="Mật khẩu"
            className="ml-2 w-full"
            onChangeText={(value) => (passwordRef.current = value)}
          />

          <TouchableOpacity className="absolute top-[13px] right-3">
            {/* <Octicons name="eye" size={24} color="#128F51" /> */}
            <Octicons name="eye-closed" size={22} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        <View className="bg-gray-100 w-full p-[10px] mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons name="lock-check" size={22} color="#128F51" />
          <TextInput
            placeholder="Xác nhận mật khẩu"
            className="ml-2 w-full"
            onChangeText={(value) => (confirmPassRef.current = value)}
          />
        </View>

        <TouchableOpacity
          className="w-full bg-primary p-[10px] mt-[36px] mb-3 rounded-2xl items-center py-4"
          onPress={handleRegister}
        >
          <Text className="text-white text-[16px] font-bold">Đăng Ký</Text>
        </TouchableOpacity>

        <View className="justify-center items-center flex-row mt-3">
          <Text>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.replace("(auth)/login")}>
            <Text className="text-lighter_primary">Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
