import React, { useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import { createContext, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  sigInWhitGoogle(): Promise<void>;
  sigOut(): Promise<void>;
}

type AuthorizationResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);

  const userStorageKey = "@gofinances:user";

  const sigOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  };

  const sigInWhitGoogle = async () => {
    try {
      const CLIENT_ID =
        "153119559432-jbrck0oc0lcen8od9sr66cblildh1oj8.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@jeremias.lima/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        await AsyncStorage.setItem(userStorageKey, userInfo.id);

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const userInStorage = await AsyncStorage.getItem(userStorageKey);

      if (userInStorage) {
        const userLogged = JSON.parse(userInStorage) as User;
        setUser(userLogged);
      }
    };

    console.log(user);
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, sigInWhitGoogle, sigOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
