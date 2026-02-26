import { AppKeyboardAvoidingView } from "@/components/app-keyboard-avoiding-view";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AppKeyboardAvoidingView contentContainerClassName="px-5">
      <View className="items-center">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-24 h-24 mb-5"
        />
        <Text className="text-4xl text-astros-white mb-10 font-bold text-center">
          SpaceInYourPhone
        </Text>
        <View className="w-full">
          <TextInput
            className="w-full bg-astros-card text-astros-white p-4 mb-5 rounded-xl"
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="w-full bg-astros-card text-astros-white p-4 mb-5 rounded-xl"
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity className="w-full bg-astros-accent p-4 rounded-xl items-center mb-4">
            <Text className="text-astros-white font-bold">Log In</Text>
          </TouchableOpacity>
          <Link href="/register" asChild>
            <TouchableOpacity className="w-full border border-astros-accent p-4 rounded-xl items-center">
              <Text className="text-astros-accent font-bold">
                Create Account
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </AppKeyboardAvoidingView>
  );
};

export default LoginScreen;
