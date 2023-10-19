import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Criar Context
const UserContext = createContext();

// Provider
export const UserProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null); // Inicialmente, o usuário é nulo
  const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleRegister = async (username, email, password) => {
    try {
      const response = await axios.post(
        `http://10.109.25.72:8000/api/students/`,
        {
          username,
          email,
          password,
        }
      );

      console.log(response.data);
      await AsyncStorage.setItem("@user_info", JSON.stringify(response.data));
      handleLogin(username);
    } catch (err) {
      return err.response;
    }
  };

  const handleLogin = useCallback(async (username, password) => {
    try {
      const response = await axios.post(
        `http://10.109.25.72:8000/api-token-auth/`,
        {
          username,
          password,
        }
      );

      console.log(response.data);
      const token = response.data.token;
      console.log(token);
      await AsyncStorage.setItem("@token", token);

      const userResponse = await axios.get(
        `http://10.109.25.72:8000/api/students/?username=${username}`,
        { headers: { Authorization: `Token ${token}` } }
      );
      setUser(userResponse.data[0]);
      await AsyncStorage.setItem("@user", JSON.stringify(userResponse.data[0]));
      console.log(userResponse.data[0]);
    } catch (err) {
      return err.response;
    }
  }, []);

  const fetchUser = useCallback(async () => {
    const storedToken = await AsyncStorage.getItem("@token");
    const storedUser = await AsyncStorage.getItem("@user");

    if (!storedUser || !storedToken) {
      Logout();
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    try {
      const userResponse = await axios.get(
        `http://10.109.25.72:8000/api/students/?username=${parsedUser.username}`,
        { headers: { Authorization: `Token ${storedToken}` } }
      );
      setUser(userResponse.data[0]);
      setToken(storedToken);
      if (storedUser !== userResponse.data[0]) {
        await AsyncStorage.setItem(
          "@user",
          JSON.stringify(userResponse.data[0])
        );
      }

      if (userResponse.data[0] && storedToken) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      FetchStudentTasks(userResponse.data[0]);
    } catch (error) {
      console.log("erro ao dar fetchUser", error);
    }
  }, []);

  const FetchStudentTasks = useCallback(async (studentData) => {
    try {
      const response = await axios.get(
        `http://10.109.25.72:8000/api/students/${studentData.id}/tasks/`
      );
      const responseTasks = response.data;
      setTasks(responseTasks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("@token")
      .then((storedToken) => {
        return AsyncStorage.getItem("@user").then((storedUser) => {
          if (storedUser && storedToken) {
            fetchUser();
          }
        });
      })
      .catch((error) => {
        console.log("Erro ao buscar dados armazenados", error);
      });
  }, [fetchUser]);

  const Logout = () => {
    console.log("deslogado");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleRegister,
        handleLogin,
        token,
        isLogged,
        tasks,
      }}>
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
