import { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/hooks/AuthContext";
import Input from "@/components/Input";

const LoginScreen = () => {
  const [isShow, setIsShow] = useState(false);

  const { login } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Đăng nhập", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const response = await login(emailRef.current, passwordRef.current);

    if (!response.success) {
      Alert.alert("Đăng nhập thất bại!", response.msg);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("@assets/paws-logo.png")}
          className="w-[132px] h-1/6 my-4"
        />
        <Text className="text-4xl font-bold text-lighter_primary mb-10">
          Bio
          <Text className="text-4xl font-bold text-yellow-500">Map</Text>
        </Text>

        <Input
          leftIcon={
            <MaterialCommunityIcons name="email" size={22} color="#128F51" />
          }
          placeholder="Email"
          onChangeText={(value) => (emailRef.current = value)}
        />

        <Input
          leftIcon={
            <MaterialCommunityIcons name="lock" size={22} color="#128F51" />
          }
          placeholder="Mật khẩu"
          onChangeText={(value) => (passwordRef.current = value)}
          secureTextEntry={!isShow}
          rightIcon={
            <TouchableOpacity
              className="absolute top-[13px] right-3"
              onPress={() => {
                setIsShow(!isShow);
              }}
            >
              <Octicons
                name={isShow ? "eye" : "eye-closed"}
                size={22}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          }
        />

        <TouchableOpacity
          className="w-full bg-primary p-3 mt-[36px] mb-3 rounded-2xl items-center py-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-[16px] font-bold">Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-lighter_primary mb-4">Quên mật khẩu?</Text>
        </TouchableOpacity>

        <View className="w-11/12 bg-gray-200 h-px rounded-full justify-center items-center my-5">
          <View className="bg-white w-[66px] h-6 items-center">
            <Text className="text-gray-600">Hoặc</Text>
          </View>
        </View>

        <TouchableOpacity
          className="w-9/12 bg-white p-3 mt-2 rounded-xl border-2 border-gray-200 items-center"
          onPress={() => router.replace("(auth)/signup")}
        >
          <Text className="text-[16px]">Tạo tài khoản mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
