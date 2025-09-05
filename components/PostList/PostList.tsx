import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data: Post[] = await res.json();
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0369A1" />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="bg-white p-4 m-2 rounded-xl shadow">
          <Text className="text-lg font-bold text-sky-800">{item.title}</Text>
          <Text className="text-sm text-sky-600 mt-1">{item.body}</Text>
        </View>
      )}
    />
  );
}
