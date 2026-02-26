import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppKeyboardAvoidingViewProps {
  children: React.ReactNode;
  contentContainerClassName?: string;
  className?: string;
}

export const AppKeyboardAvoidingView: React.FC<
  AppKeyboardAvoidingViewProps
> = ({ children, contentContainerClassName, className }) => {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className={`bg-astros-bg-dark ${className || ""}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            className={contentContainerClassName}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
