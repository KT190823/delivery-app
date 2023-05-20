import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubcribe;
  }, []);
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView className="flex items-center justify-center h-screen bg-gray-100">
      <KeyboardAvoidingView className="space-y-3">
        <View>
          <Text className="text-center font-bold text-xl">Login</Text>
        </View>
        <View className="space-y-3">
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            className="border-2 border-solid shadow-md border-white bg-white  w-64 p-2 rounded-lg"
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            className="border-2 border-solid shadow-md border-white bg-white  w-64 p-2 rounded-lg"
          />
        </View>

        <View className="flex items-center space-y-3">
          <TouchableOpacity onPress={handleLogin}>
            <Text className="w-32 text-center bg-orange-500 text-white p-2 rounded-xl">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signin");
            }}
          >
            <Text className="w-32 text-center bg-white text-orange-500 p-2 rounded-xl border-orange-500 border-2 border-solid">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
