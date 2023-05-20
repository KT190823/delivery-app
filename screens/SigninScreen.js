import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const SigninScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView className="flex items-center justify-center h-screen bg-gray-100">
      <KeyboardAvoidingView className="space-y-3">
        <View>
          <Text className="text-center font-bold text-xl">Register</Text>
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
          <TouchableOpacity onPress={signIn}>
            <Text className="w-32 text-center bg-orange-500 text-white p-2 rounded-xl">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SigninScreen;
