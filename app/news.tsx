// app/news.tsx
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Article = {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
};

export default function NewsScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=0b6b6c5116a54292ac5d7f2bf139ace2`
        );
        const data = await response.json();

        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          setError("Failed to fetch news.");
        }
      } catch (err) {
        console.log(err)
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0369a1" />
        <Text className="mt-3 text-gray-600">Fetching latest headlines...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => WebBrowser.openBrowserAsync(item.url)}
          className="bg-white mb-4 rounded-xl shadow-md overflow-hidden"
        >
          {item.urlToImage && (
            <Image
              source={{ uri: item.urlToImage }}
              className="w-full h-48"
              resizeMode="cover"
            />
          )}
          <View className="p-4">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              {item.title}
            </Text>
            {item.description && (
              <Text className="text-gray-600">{item.description}</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
