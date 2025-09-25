import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, Image, Text, View } from "react-native";

const CLOUD_NAME = "dam9fcx0b";
const UPLOAD_PRESET = "semight_upload";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Pick from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleUpload(result.assets[0].uri);
    }
  };

  // Capture from camera
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is needed to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleUpload(result.assets[0].uri);
    }
  };

  // Upload to Cloudinary
  const handleUpload = async (uri: string) => {
    try {
      setUploading(true);
      let formData = new FormData();
      formData.append("file", {
        uri,
        type: "image/jpeg",
        name: "profile.jpg",
      } as unknown as Blob);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setImage(data.secure_url);
        Alert.alert("Upload Successful 🎉", "Profile picture updated!");
      } else {
        Alert.alert("Upload Failed", JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-sky-50 p-4">
      <Text className="text-lg font-bold text-sky-900 mb-4">👤 Profile Screen</Text>

      {image ? (
        <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }} />
      ) : (
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#e5e7eb",
            marginBottom: 20,
          }}
        />
      )}

      {uploading ? (
        <ActivityIndicator size="large" color="#0ea5e9" />
      ) : (
        <>
          <Button title="Pick from Gallery" onPress={pickImage} />
          <View style={{ marginVertical: 10 }} />
          <Button title="Take a Photo" onPress={takePhoto} />
        </>
      )}
    </View>
  );
}
