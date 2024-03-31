import { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/hooks/AuthContext";
import Input from "@/components/Input";

const SignupScreen = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

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
      Alert.alert("Đăng ký", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    let response = await register(
      usernameRef.current,
      emailRef.current,
      passwordRef.current
    );

    if (!response.success) {
      Alert.alert("Đăng ký", response.msg);
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

        <Text className="text-4xl font-bold text-lighter_primary mb-10">
          Bio
          <Text className="text-4xl font-bold text-yellow-500">Map</Text>
        </Text>

        <Input
          leftIcon={
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="#128F51"
            />
          }
          placeholder="Tên tài khoản"
          onChangeText={(value) => (usernameRef.current = value)}
        />

        <Input
          leftIcon={
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#128F51"
            />
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

        <Input
          leftIcon={
            <MaterialCommunityIcons
              name="lock-check"
              size={22}
              color="#128F51"
            />
          }
          placeholder="Xác nhận mật khẩu"
          onChangeText={(value) => (confirmPassRef.current = value)}
          secureTextEntry={!isShowConfirm}
          rightIcon={
            <TouchableOpacity
              className="absolute top-[13px] right-3"
              onPress={() => {
                setIsShowConfirm(!isShowConfirm);
              }}
            >
              <Octicons
                name={isShowConfirm ? "eye" : "eye-closed"}
                size={22}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          }
        />

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
