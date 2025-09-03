import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({ default: {} }),
      }}
    >
      <Tabs.Screen name="cars" options={{ title: "Cars" }} />
      <Tabs.Screen name="expenses" options={{ title: "Expenses" }} />
    </Tabs>
  );
}
