import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  loading,
  onPress,
  disabled,
  variant = "primary",
  className,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return "border border-astros-accent bg-transparent";
      case "secondary":
        return "bg-astros-card";
      default:
        return "bg-astros-accent";
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case "outline":
        return "text-astros-accent text-center";
      default:
        return "text-astros-white font-bold text-center text-lg";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`w-full p-4 rounded-xl items-center ${getVariantStyles()} ${
        disabled || loading ? "opacity-70" : ""
      } ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#818cf8" : "white"}
        />
      ) : (
        <Text className={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
