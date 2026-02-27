import { AppButton } from "@/components/app-button";
import { AppForm } from "@/components/app-form";
import { AppKeyboardAvoidingView } from "@/components/app-keyboard-avoiding-view";
import { AppTextInput } from "@/components/app-text-input";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/hooks/Auth/use-auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const { register, loading } = useAuth();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("auth.invalidEmail"))
      .required(t("auth.emailRequired")),
    firstName: Yup.string().required(t("auth.firstNameRequired")),
    lastName: Yup.string().required(t("auth.lastNameRequired")),
    gender: Yup.string().required(t("auth.genderRequired")),
    password: Yup.string()
      .min(6, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
    birthPlaceLongitude: Yup.string().required(t("auth.longitudeRequired")),
    birthPlaceLatitude: Yup.string().required(t("auth.latitudeRequired")),
  });

  const handleRegister = async (values: any) => {
    const registrationData = {
      ...values,
      dateOfBirth: dateOfBirth.toISOString(),
      gender: Number.parseInt(values.gender, 10),
    };

    const result = await register(registrationData);

    if (result.success) {
      Alert.alert(t("auth.registrationSuccessful"), t("auth.canNowLogin"), [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } else {
      Alert.alert(t("auth.registrationFailed"), result.error);
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
        <LanguageSwitcher className="absolute right-0 top-0" />

        <Text className="text-4xl text-astros-white mb-8 mt-4 font-bold text-center">
          {t("auth.joinTheSpace")}
        </Text>

        <AppForm
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
          vibrateOnFailure={true}
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
                placeholder={t("auth.email")}
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
                  {t("auth.birthDate")}: {dateOfBirth.toLocaleDateString()}
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
                placeholder={t("auth.firstName")}
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                error={errors.firstName}
                touched={touched.firstName}
              />

              <AppTextInput
                placeholder={t("auth.lastName")}
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
                  <Picker.Item label={t("auth.male")} value="0" />
                  <Picker.Item label={t("auth.female")} value="1" />
                  <Picker.Item label={t("auth.other")} value="2" />
                </Picker>
              </View>

              <AppTextInput
                placeholder={t("auth.password")}
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
                  placeholder={t("auth.longitude")}
                  value={values.birthPlaceLongitude}
                  onChangeText={handleChange("birthPlaceLongitude")}
                  onBlur={handleBlur("birthPlaceLongitude")}
                  error={errors.birthPlaceLongitude}
                  touched={touched.birthPlaceLongitude}
                  keyboardType="numeric"
                />
                <AppTextInput
                  containerClassName="flex-1"
                  placeholder={t("auth.latitude")}
                  value={values.birthPlaceLatitude}
                  onChangeText={handleChange("birthPlaceLatitude")}
                  onBlur={handleBlur("birthPlaceLatitude")}
                  error={errors.birthPlaceLatitude}
                  touched={touched.birthPlaceLatitude}
                  keyboardType="numeric"
                />
              </View>

              <AppButton
                title={t("auth.register")}
                loading={loading}
                onPress={() => handleSubmit()}
                className="mb-6"
              />

              <Link href="/login" asChild>
                <TouchableOpacity className="mt-2">
                  <Text className="text-astros-accent font-medium text-center">
                    {t("auth.alreadyHaveAccount")}
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </AppForm>
      </View>
    </AppKeyboardAvoidingView>
  );
}
