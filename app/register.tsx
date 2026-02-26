import { AppKeyboardAvoidingView } from "@/components/app-keyboard-avoiding-view";
import apiClient from "@/utils/apiClient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

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
    <AppKeyboardAvoidingView contentContainerClassName="px-6">
      <View className="items-center justify-center py-12">
        <Text className="text-4xl text-astros-white mb-8 font-bold text-center">
          Join the Space
        </Text>
        <TextInput
          className="w-full bg-astros-card text-astros-white p-4 mb-4 rounded-xl"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="w-full bg-astros-card p-4 mb-4 rounded-xl border border-astros-accent/30"
        >
          <Text className="text-astros-muted">
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
          className="w-full bg-astros-card text-astros-white p-4 mb-4 rounded-xl"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#94A3B8"
        />
        <TextInput
          className="w-full bg-astros-card text-astros-white p-4 mb-4 rounded-xl"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#94A3B8"
        />
        <View className="w-full bg-astros-card mb-4 rounded-xl border border-astros-accent/30 overflow-hidden">
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={{ color: "#F8FAFC", height: 55 }}
            dropdownIconColor="#94A3B8"
          >
            <Picker.Item label="Male" value="0" />
            <Picker.Item label="Female" value="1" />
            <Picker.Item label="Other" value="2" />
          </Picker>
        </View>
        <TextInput
          className="w-full bg-astros-card text-astros-white p-4 mb-4 rounded-xl"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#94A3B8"
        />
        <View className="flex-row gap-4 mb-6">
          <TextInput
            className="flex-1 bg-astros-card text-astros-white p-4 rounded-xl"
            placeholder="Longitude"
            value={birthPlaceLongitude}
            onChangeText={setBirthPlaceLongitude}
            keyboardType="numeric"
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            className="flex-1 bg-astros-card text-astros-white p-4 rounded-xl"
            placeholder="Latitude"
            value={birthPlaceLatitude}
            onChangeText={setBirthPlaceLatitude}
            keyboardType="numeric"
            placeholderTextColor="#94A3B8"
          />
        </View>
        <TouchableOpacity
          onPress={handleRegister}
          className="w-full bg-astros-accent p-4 rounded-xl items-center mb-6"
        >
          <Text className="text-astros-white font-bold text-lg">Register</Text>
        </TouchableOpacity>
        <Link href="/login" asChild>
          <TouchableOpacity className="mt-2">
            <Text className="text-astros-accent font-medium text-center">
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </AppKeyboardAvoidingView>
  );
}
