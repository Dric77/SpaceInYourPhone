import { AppButton } from "@/components/app-button";
import { AppKeyboardAvoidingView } from "@/components/app-keyboard-avoiding-view";
import { AppTextInput } from "@/components/app-text-input";
import { useAuth } from "@/hooks/Auth/use-auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  birthPlaceLongitude: Yup.string().required("Longitude is required"),
  birthPlaceLatitude: Yup.string().required("Latitude is required"),
});

export default function RegisterScreen() {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const { register, loading } = useAuth();

  const handleRegister = async (values: any) => {
    const registrationData = {
      ...values,
      dateOfBirth: dateOfBirth.toISOString(),
      gender: Number.parseInt(values.gender, 10),
    };

    const result = await register(registrationData);

    if (result.success) {
      Alert.alert("Registration Successful", "You can now log in.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } else {
      Alert.alert("Registration Failed", result.error);
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

        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            gender: "0",
            password: "",
            birthPlaceLongitude: "",
            birthPlaceLatitude: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View className="w-full">
              <AppTextInput
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                autoCapitalize="none"
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

              <AppTextInput
                placeholder="First Name"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                error={errors.firstName}
                touched={touched.firstName}
              />

              <AppTextInput
                placeholder="Last Name"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                error={errors.lastName}
                touched={touched.lastName}
              />

              <View className="w-full bg-astros-card mb-4 rounded-xl border border-astros-accent/30 overflow-hidden">
                <Picker
                  selectedValue={values.gender}
                  onValueChange={(itemValue) =>
                    setFieldValue("gender", itemValue)
                  }
                  style={{ color: "#F8FAFC", height: 55 }}
                  dropdownIconColor="#94A3B8"
                >
                  <Picker.Item label="Male" value="0" />
                  <Picker.Item label="Female" value="1" />
                  <Picker.Item label="Other" value="2" />
                </Picker>
              </View>

              <AppTextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
              />

              <View className="flex-row gap-4 mb-2">
                <AppTextInput
                  containerClassName="flex-1"
                  placeholder="Longitude"
                  value={values.birthPlaceLongitude}
                  onChangeText={handleChange("birthPlaceLongitude")}
                  onBlur={handleBlur("birthPlaceLongitude")}
                  error={errors.birthPlaceLongitude}
                  touched={touched.birthPlaceLongitude}
                  keyboardType="numeric"
                />
                <AppTextInput
                  containerClassName="flex-1"
                  placeholder="Latitude"
                  value={values.birthPlaceLatitude}
                  onChangeText={handleChange("birthPlaceLatitude")}
                  onBlur={handleBlur("birthPlaceLatitude")}
                  error={errors.birthPlaceLatitude}
                  touched={touched.birthPlaceLatitude}
                  keyboardType="numeric"
                />
              </View>

              <AppButton
                title="Register"
                loading={loading}
                onPress={() => handleSubmit()}
                className="mb-6"
              />

              <Link href="/login" asChild>
                <TouchableOpacity className="mt-2">
                  <Text className="text-astros-accent font-medium text-center">
                    Already have an account? Log in
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </Formik>
      </View>
    </AppKeyboardAvoidingView>
  );
}
