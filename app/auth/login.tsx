import { loginSuccess } from "@/store/slices/authSlice";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // Fake API call
    if (email === "test@mail.com" && password === "123456") {
      const fakeToken = "mock-jwt-token-123";
      dispatch(loginSuccess(fakeToken));
      Alert.alert("Login Successful", `Token: ${fakeToken}`);
    } else {
      Alert.alert("Login Failed", "Invalid credentials");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
