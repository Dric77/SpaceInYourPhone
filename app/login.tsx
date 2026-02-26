import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {/* 1. Added keyboardVerticalOffset to account for headers/status bars */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* 2. Wrap in TouchableWithoutFeedback to dismiss keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            className="px-5"
            // 3. Prevent scroll indicators from overlapping the keyboard
            keyboardShouldPersistTaps="handled"
          >
            <View className="items-center">
              <Image
                source={require("@/assets/images/icon.png")}
                className="w-24 h-24 mb-5"
              />
              <Text className="text-3xl text-[#66FCF1] mb-10 font-bold text-center">
                AstroLogin
              </Text>
              <View className="w-full">
                <TextInput
                  className="w-full bg-[#1F2833] text-white p-4 mb-5 rounded"
                  placeholder="Email"
                  placeholderTextColor="#C5C6C7"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  className="w-full bg-[#1F2833] text-white p-4 mb-5 rounded"
                  placeholder="Password"
                  placeholderTextColor="#C5C6C7"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry
                />
                <TouchableOpacity className="w-full bg-[#45A29E] p-4 rounded items-center mb-4">
                  <Text className="text-white font-bold">Login</Text>
                </TouchableOpacity>
                <Link href="/register" asChild>
                  <TouchableOpacity className="w-full bg-[#45A29E] p-4 rounded items-center">
                    <Text className="text-white font-bold">Create Account</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
