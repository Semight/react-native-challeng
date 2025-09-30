import * as React from "react";
import {
    Button,
    Card,
    Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaperDemoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
          React Native Paper Demo
        </Text>

        <Card style={{ marginBottom: 20 }}>
          <Card.Title title="Hello 👋" subtitle="Welcome to Day 27" />
          <Card.Content>
            <Text variant="bodyMedium">
              This is a simple card component built with React Native Paper.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button mode="contained">Ok</Button>
          </Card.Actions>
        </Card>
        <Button
          mode="contained"
          onPress={() => console.log("Contained Button pressed")}
          style={{ marginBottom: 10 }}
        >
          Contained Button
        </Button>

        <Button
          mode="outlined"
          onPress={() => console.log("Outlined Button pressed")}
        >
          Outlined Button
        </Button>
      </SafeAreaView>
  );
}
