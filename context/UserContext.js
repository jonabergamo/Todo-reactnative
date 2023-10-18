import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Criar Context
const UserContext = createContext();

// Provider
export const UserProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null); // Inicialmente, o usuário é nulo

  const handleRegister = async (username, email, password) => {
    try {
      const response = await axios.post(`http://10.109.25.72:8000/api/alunos`, {
        username,
        email,
        password,
      });

      console.log(response.data);
      await AsyncStorage.setItem("@user_info", JSON.stringify(response.data));
      handleLogin(username);
    } catch (err) {
      return err.response;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        `http://10.109.25.72:8000/api/api-token-auth`,
        {
          username,
          password,
        }
      );

      console.log(response.data);
      await AsyncStorage.setItem("@token", JSON.stringify(response.data));

      const userResponse = await axios.get("");
    } catch (err) {
      return err.response;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, handleRegister, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
