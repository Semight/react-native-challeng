// app/settings.tsx
import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity
  const translateY = useRef(new Animated.Value(50)).current; // slide position
  const [visible, setVisible] = useState(false);

  const toggleAnimation = () => {
    if (!visible) {
      // Fade in & slide up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Fade out & slide down
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setVisible(!visible);
  };

  return (
    <View className="flex-1 items-center justify-center bg-sky-50">
      <Text className="text-lg font-bold text-sky-900 mb-5">
        ⚙️ Settings Screen (Animation Demo)
      </Text>

      <TouchableOpacity
        className="bg-sky-700 px-6 py-3 rounded-xl mb-6"
        onPress={toggleAnimation}
      >
        <Text className="text-white text-base font-semibold">
          {visible ? "Hide Box" : "Show Box"}
        </Text>
      </TouchableOpacity>

      <Animated.View
        className="w-32 h-32 bg-sky-400 rounded-xl"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}
      />
    </View>
  );
}
