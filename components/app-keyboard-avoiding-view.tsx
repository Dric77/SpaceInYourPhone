import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
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
  /**
   * keyboardVerticalOffset is the "secret sauce."
   * On iOS, if you have a header or tab bar, you usually need to
   * account for its height here to keep the input perfectly aligned.
   */
  const headerHeight = 0; // Adjust this if you use React Navigation headers

  return (
    <SafeAreaView
      style={styles.container}
      className={`bg-astros-bg-dark ${className || ""}`}
    >
      <KeyboardAvoidingView
        // "padding" is generally smoother for iOS to sit right on top of the keyboard
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              { justifyContent: "center" }, // Ensures inputs stay toward the bottom/keyboard
            ]}
            className={contentContainerClassName}
            keyboardShouldPersistTaps="handled"
            // This prevents the scroll view from bouncing awkwardly during the animation
            bounces={false}
          >
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
