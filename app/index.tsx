import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => router.push({ pathname: "/details", params: { username: "David" } })}
      />
    </View>
  );    
}
