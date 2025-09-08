import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DetailsScreen() {
  const { username } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>Details Screen</Text>
      <Text style={{ marginTop: 10 }}>Hello, {username}</Text>
    </View>
  );
}
