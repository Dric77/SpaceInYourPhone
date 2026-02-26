import apiClient from "@/utils/apiClient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("0");
  const [password, setPassword] = useState("");
  const [birthPlaceLongitude, setBirthPlaceLongitude] = useState("");
  const [birthPlaceLatitude, setBirthPlaceLatitude] = useState("");

  const handleRegister = async () => {
    try {
      const response = await apiClient.post(
        "/api/users/Authentication/Register",
        {
          email,
          dateOfBirth: dateOfBirth.toISOString(),
          firstName,
          lastName,
          gender: parseInt(gender, 10),
          password,
          birthPlaceLongitude,
          birthPlaceLatitude,
        },
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Registration Successful", "You can now log in.");
      } else {
        const errorData = response.data;
        console.error("Registration failed:", errorData);
        Alert.alert(
          "Registration Failed",
          errorData.message || "Something went wrong.",
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Registration Error", "An unexpected error occurred.");
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    setDateOfBirth(currentDate);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-black px-5"
        >
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-3xl text-[#66FCF1] mb-10 font-bold">
              Create Account
            </Text>
            <TextInput
              className="w-full bg-[#1F2833] text-white p-4 mb-3 rounded"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#C5C6C7"
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="w-full bg-[#1F2833] p-4 mb-3 rounded border border-gray-700"
            >
              <Text className="text-[#ebebeb]">
                Birth Date: {dateOfBirth.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <TextInput
              className="w-full bg-[#1F2833] text-white p-4 mb-3 rounded"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#C5C6C7"
            />
            <TextInput
              className="w-full bg-[#1F2833] text-white p-4 mb-3 rounded"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#C5C6C7"
            />
            <View className="w-full bg-[#1F2833] mb-3 rounded border border-gray-700 overflow-hidden">
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={{ color: "#ebebeb", height: 55 }}
                dropdownIconColor="#ebebeb"
              >
                <Picker.Item label="Male" value="0" />
                <Picker.Item label="Female" value="1" />
                <Picker.Item label="Other" value="2" />
              </Picker>
            </View>
            <TextInput
              className="w-full bg-[#1F2833] text-white p-4 mb-3 rounded"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#C5C6C7"
            />
            <TextInput
              className="w-full bg-[#1F2833] text-white p-4 mb-3 rounded"
              placeholder="Birth Place Longitude"
              value={birthPlaceLongitude}
              onChangeText={setBirthPlaceLongitude}
              keyboardType="numeric"
              placeholderTextColor="#C5C6C7"
            />
            <TextInput
              className="w-full bg-[#1F2833] text-white p-4 mb-5 rounded"
              placeholder="Birth Place Latitude"
              value={birthPlaceLatitude}
              onChangeText={setBirthPlaceLatitude}
              keyboardType="numeric"
              placeholderTextColor="#C5C6C7"
            />
            <TouchableOpacity
              onPress={handleRegister}
              className="w-full bg-[#45A29E] p-4 rounded items-center mb-4"
            >
              <Text className="text-white font-bold">Register</Text>
            </TouchableOpacity>
            <Link href="/login" asChild>
              <TouchableOpacity className="mt-3">
                <Text className="text-[#007BFF]">
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
