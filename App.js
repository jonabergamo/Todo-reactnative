import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { UserProvider, useUser } from "./context/UserContext";
import SignUpScreen from "./screens/SignUpScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

function InitialRoute() {
  const { isLogged } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogged ? "Dashboard" : "Login"}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <InitialRoute />
    </UserProvider>
  );
}

const styles = StyleSheet.create({});
