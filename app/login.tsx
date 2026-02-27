import { AppButton } from "@/components/app-button";
import { AppKeyboardAvoidingView } from "@/components/app-keyboard-avoiding-view";
import { AppTextInput } from "@/components/app-text-input";
import { useAuth } from "@/hooks/Auth/use-auth";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Alert, Text, View } from "react-native";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const router = useRouter();
  const { login, loading } = useAuth();

  const handleLogin = async (values: any) => {
    const result = await login(values);
    if (result.success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Login Failed", result.error);
    }
  };

  return (
    <AppKeyboardAvoidingView contentContainerClassName="px-5">
      <View className="items-center">
        {/* <Image
          source={require("@/assets/images/icon.png")}
          className="w-24 h-24 mb-5"
        /> */}
        <Text className="text-4xl text-astros-white mb-10 font-bold text-center">
          Space In Your Phone
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
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
                placeholder="Email"
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
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
                containerClassName="mb-5"
              />

              <AppButton
                title="Log In"
                loading={loading}
                onPress={() => handleSubmit()}
                className="mb-4"
              />

              <Link href="/register" asChild>
                <AppButton title="Create Account" variant="outline" />
              </Link>
            </View>
          )}
        </Formik>
      </View>
    </AppKeyboardAvoidingView>
  );
};

export default LoginScreen;
