import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const API_KEY = "7634912a342804ba28035a7e62a95cc2";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    try {
      // current weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message || "City not found");
        setWeather(null);
        setForecast([]);
      } else {
        setWeather(data);
      }

      // 5-day forecast
      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await resForecast.json();

      if (forecastData.cod === "200") {
        // pick one forecast per day (12:00 PM entries)
        const daily = forecastData.list.filter((item: any) =>
          item.dt_txt.includes("12:00:00")
        );
        setForecast(daily.slice(0, 5)); // only next 5 days
      } else {
        setForecast([]);
      }
    } catch (err) {
      console.error("Fetch weather error:", err);
      setError("Something went wrong");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const renderForecastCard = ({ item }: { item: any }) => {
    const date = new Date(item.dt * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };
    const dateStr = date.toLocaleDateString(undefined, options);

    return (
      <View className="bg-gray-100 rounded-lg p-3 items-center mx-2 w-28">
        <Text className="font-semibold">{dateStr}</Text>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          }}
          style={{ width: 50, height: 50 }}
        />
        <Text>{Math.round(item.main.temp)}°C</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 items-center justify-center bg-white">
      {/* Input */}
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        className="w-full border border-gray-300 p-3 rounded-lg mb-4"
      />
      <TouchableOpacity
        onPress={fetchWeather}
        className="bg-blue-500 px-4 py-2 rounded-lg mb-4"
      >
        <Text className="text-white font-semibold">Get Weather</Text>
      </TouchableOpacity>

      {/* Loading & Errors */}
      {loading && <ActivityIndicator size="large" color="blue" />}
      {error ? <Text className="text-red-500">{error}</Text> : null}

      {/* Current Weather */}
      {weather && (
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold">{weather.name}</Text>
          <Text className="text-lg capitalize">
            {weather.weather[0].description}
          </Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text className="text-xl font-semibold">
            {Math.round(weather.main.temp)}°C
          </Text>
          <Text>Feels like {Math.round(weather.main.feels_like)}°C</Text>
          <Text>Humidity: {weather.main.humidity}%</Text>
        </View>
      )}

      {/* Forecast */}
      {forecast.length > 0 && (
        <View className="w-full">
          <Text className="text-xl font-bold mb-2">5-Day Forecast</Text>
          <FlatList
            horizontal
            data={forecast}
            keyExtractor={(item) => item.dt.toString()}
            renderItem={renderForecastCard}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
