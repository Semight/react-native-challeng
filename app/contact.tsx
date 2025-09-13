import React, { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const contacts = [
  { id: "1", name: "Chinedu Okafor", phone: "+234 801 234 5678" },
  { id: "2", name: "Amaka Obi", phone: "+234 802 345 6789" },
  { id: "3", name: "Ibrahim Musa", phone: "+234 803 456 7890" },
  { id: "4", name: "Ngozi Nwosu", phone: "+234 804 567 8901" },
  { id: "5", name: "Oluwaseun Adeyemi", phone: "+234 805 678 9012" },
  { id: "6", name: "Aisha Abdullahi", phone: "+234 806 789 0123" },
  { id: "7", name: "Chiamaka Eze", phone: "+234 807 890 1234" },
  { id: "8", name: "Kunle Balogun", phone: "+234 808 901 2345" },
  { id: "9", name: "Hauwa Suleiman", phone: "+234 809 012 3456" },
  { id: "10", name: "Emeka Uche", phone: "+234 810 123 4567" },
  { id: "11", name: "Yemi Akinwale", phone: "+234 811 234 5678" },
  { id: "12", name: "Blessing Ojo", phone: "+234 812 345 6789" },
  { id: "13", name: "Bashir Lawal", phone: "+234 813 456 7890" },
  { id: "14", name: "Chidinma Okeke", phone: "+234 814 567 8901" },
  { id: "15", name: "Sunday Olatunji", phone: "+234 815 678 9012" },
  { id: "16", name: "Fatima Danjuma", phone: "+234 816 789 0123" },
  { id: "17", name: "Victor Nnamdi", phone: "+234 817 890 1234" },
  { id: "18", name: "Zainab Yusuf", phone: "+234 818 901 2345" },
  { id: "19", name: "Samuel Ayodele", phone: "+234 819 012 3456" },
  { id: "20", name: "Gloria Nwachukwu", phone: "+234 820 123 4567" },
  { id: "21", name: "Ahmed Bello", phone: "+234 821 234 5678" },
  { id: "22", name: "Ifeoma Anozie", phone: "+234 822 345 6789" },
];

const ContactItem = ({ item }: { item: typeof contacts[0] }) => {
  // Extract initials (first + last)
  const initials = item.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <View className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center mr-4">
        <Text className="text-white font-bold text-lg">{initials}</Text>
      </View>
      <View>
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</Text>
        <Text className="text-gray-600 dark:text-gray-400">{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ContactList() {
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Contacts</Text>
        <TextInput
          placeholder="Search by name or phone..."
          value={search}
          onChangeText={setSearch}
          className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white"
        />
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem item={item} />}
      />
    </SafeAreaView>
  );
}
