import { supportedLanguages } from "@/i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
}) => {
  const { i18n } = useTranslation();

  // If only one language is supported, don't show the switcher
  if (supportedLanguages.length <= 1) {
    return null;
  }

  const toggleLanguage = () => {
    const currentIndex = supportedLanguages.findIndex(
      (lng) => lng.code === i18n.language,
    );
    const nextIndex = (currentIndex + 1) % supportedLanguages.length;
    const nextLng = supportedLanguages[nextIndex].code;
    i18n.changeLanguage(nextLng);
  };

  const currentLabel =
    supportedLanguages.find((lng) => lng.code === i18n.language)?.label || "EN";

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      className={`bg-astros-card p-2 rounded-lg border border-astros-accent/30 ${className}`}
    >
      <Text className="text-astros-accent font-bold">{currentLabel}</Text>
    </TouchableOpacity>
  );
};
