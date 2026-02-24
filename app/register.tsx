import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL =
  "https://horoscopebackend-bdd9eecbczhbffaa.westeurope-01.azurewebsites.net";

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
      const response = await fetch(
        `${API_URL}/api/users/Authentication/Register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            dateOfBirth: dateOfBirth.toISOString(),
            firstName,
            lastName,
            gender: parseInt(gender, 10),
            password,
            birthPlaceLongitude,
            birthPlaceLatitude,
          }),
        },
      );

      if (response.ok) {
        Alert.alert("Registration Successful", "You can now log in.");
      } else {
        const errorData = await response.json();
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
    <ThemedView style={styles.container}>
      <ThemedText type="title">Create Account</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text style={{ color: "#ebebeb" }}>
          {dateOfBirth.toLocaleDateString()}
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
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#888"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Male" value="0" />
          <Picker.Item label="Female" value="1" />
          <Picker.Item label="Other" value="2" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Place Longitude"
        value={birthPlaceLongitude}
        onChangeText={setBirthPlaceLongitude}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Place Latitude"
        value={birthPlaceLatitude}
        onChangeText={setBirthPlaceLatitude}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
      <Button title="Register" onPress={handleRegister} />
      <Link href="/login" style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#ebebeb",
    justifyContent: "center",
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: "#007BFF",
  },
  pickerContainer: {
    width: "100%",
    height: 40,
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
  },
  picker: {
    color: "#ebebeb",
    backgroundColor: "transparent",
  },
  pickerItem: {
    color: "#ebebeb",
    backgroundColor: "#0B0C10",
  },
});
