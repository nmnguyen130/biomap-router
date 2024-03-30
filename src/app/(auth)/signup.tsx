import { useRef } from "react";
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
import { useAuth } from "@/hooks/AuthContext";

const SignupScreen = () => {
  const { register } = useAuth();

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPassRef = useRef("");

  const handleRegister = async () => {
    if (
      !usernameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPassRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the fields!");
      return;
    }

    let response = await register(
      usernameRef.current,
      emailRef.current,
      passwordRef.current
    );

    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <View className="flex-1 bg-white p-7">
      <View className="flex-1 items-center justify-center">
        <Image
          resizeMode="cover"
          source={require("../../../assets/paws-logo.png")}
          className="w-[132px] h-1/6 my-4"
        />

        <Text className="text-4xl font-bold text-lighter_primary ">
          Bio
          <Text className="text-4xl font-bold text-yellow-500">Map</Text>
        </Text>

        <View className="w-full bg-gray-100 p-3 mt-14 mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color="#128F51"
          />
          <TextInput
            placeholder="Tên tài khoản"
            className="w-full ms-2"
            onChangeText={(value) => (usernameRef.current = value)}
          />
        </View>

        <View className="w-full bg-gray-100 p-3 mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color="#128F51"
          />
          <TextInput
            placeholder="Email"
            className="w-full ms-2"
            onChangeText={(value) => (emailRef.current = value)}
          />
        </View>

        <View className="w-full bg-gray-100 p-3 mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons
            name="lock-outline"
            size={22}
            color="#128F51"
          />
          <TextInput
            placeholder="Mật khẩu"
            className="w-full ms-2"
            onChangeText={(value) => (passwordRef.current = value)}
            secureTextEntry
          />

          <TouchableOpacity className="absolute top-[13px] right-3">
            {/* <Octicons name="eye" size={24} color="#128F51" /> */}
            <Octicons name="eye-closed" size={22} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        <View className="w-full bg-gray-100 p-3 mb-4 rounded-lg flex-row items-center">
          <MaterialCommunityIcons name="lock-check" size={22} color="#128F51" />
          <TextInput
            placeholder="Xác nhận mật khẩu"
            className="w-full ms-2"
            onChangeText={(value) => (confirmPassRef.current = value)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="w-full bg-primary p-3 py-4 mt-8 rounded-2xl items-center"
          onPress={handleRegister}
        >
          <Text className="text-white text-[16px] font-bold">Đăng Ký</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-6">
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
