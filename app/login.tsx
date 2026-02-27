import { AppButton } from "@/components/app-button";
import { AppForm } from "@/components/app-form";
import { AppKeyboardAvoidingView } from "@/components/app-keyboard-avoiding-view";
import { AppTextInput } from "@/components/app-text-input";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/hooks/Auth/use-auth";
import { Link, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, View } from "react-native";
import * as Yup from "yup";

const LoginScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { login, loading } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("auth.invalidEmail"))
      .required(t("auth.emailRequired")),
    password: Yup.string()
      .min(6, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
  });

  const handleLogin = async (values: any) => {
    const result = await login(values);
    if (result.success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert(t("auth.loginFailed"), result.error);
    }
  };

  return (
    <AppKeyboardAvoidingView contentContainerClassName="px-5">
      <View className="items-center">
        <LanguageSwitcher className="absolute right-0 top-0" />

        <Text className="text-4xl text-astros-white mb-10 mt-12 font-bold text-center">
          {t("auth.spaceInYourPhone")}
        </Text>

        <AppForm
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
          vibrateOnFailure={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="w-full">
              <AppTextInput
                placeholder={t("auth.email")}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                autoCapitalize="none"
                containerClassName="mb-5"
              />

              <AppTextInput
                placeholder={t("auth.password")}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
                containerClassName="mb-5"
              />

              <AppButton
                title={t("auth.login")}
                loading={loading}
                onPress={() => handleSubmit()}
                className="mb-4"
              />

              <Link href="/register" asChild>
                <AppButton title={t("auth.createAccount")} variant="outline" />
              </Link>
            </View>
          )}
        </AppForm>
      </View>
    </AppKeyboardAvoidingView>
  );
};

export default LoginScreen;
