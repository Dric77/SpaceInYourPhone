import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface AppTextInputProps extends TextInputProps {
  error?: string;
  touched?: boolean;
  containerClassName?: string;
}

export const AppTextInput: React.FC<AppTextInputProps> = ({
  error,
  touched,
  containerClassName = "mb-4",
  className,
  ...props
}) => {
  const hasError = error && touched;

  return (
    <View className={containerClassName}>
      <TextInput
        className={`w-full bg-astros-card text-astros-white p-4 rounded-xl border ${
          hasError ? "border-red-500" : "border-transparent"
        } ${className}`}
        placeholderTextColor="#94A3B8"
        {...props}
      />
      {hasError && (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
};
