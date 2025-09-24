import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function NotificationsScreen() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      Alert.alert("Error", "Push Notifications only work on a real device.");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Permission denied", "Failed to get push token!");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setExpoPushToken(token);
    console.log("Expo Push Token:", token);
    Alert.alert("Push Token", token);
  };

  const scheduleLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚀 Hello from Expo!",
        body: "This is a local test notification.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        repeats: false,
      },
    });

    Alert.alert("Notification Scheduled", "It will show in 3 seconds.");
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <ScrollView className="flex-1 p-6 bg-gray-50">
      <Text className="text-2xl font-bold text-center text-blue-600 mb-6">
        🔔 Notifications Demo
      </Text>

      <TouchableOpacity
        onPress={registerForPushNotificationsAsync}
        className="bg-blue-600 py-3 px-6 rounded-xl mb-4 shadow-md"
      >
        <Text className="text-white text-center font-semibold text-lg">
          Request Permission & Get Token
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={scheduleLocalNotification}
        className="bg-green-600 py-3 px-6 rounded-xl mb-4 shadow-md"
      >
        <Text className="text-white text-center font-semibold text-lg">
          Schedule Local Notification
        </Text>
      </TouchableOpacity>

      {expoPushToken && (
        <View className="bg-white p-4 rounded-xl shadow-md mt-4">
          <Text className="text-gray-800 font-semibold mb-2">
            Your Expo Push Token:
          </Text>
          <Text className="text-gray-600">{expoPushToken}</Text>
        </View>
      )}
    </ScrollView>
  );
}
