import React from "react";
import * as AuthSession from "expo-auth-session";

import { createContext, ReactNode, useContext } from "react";

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
  sigInWhitGoogle(): Promise<void>
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: "124451515",
    name: "Jeremias",
    email: "jere@jere.com",
  };

  const sigInWhitGoogle = async () => {
    try {
      const CLIENT_ID = "153119559432-jbrck0oc0lcen8od9sr66cblildh1oj8.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@jeremias.lima/goFinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log('resposta googfle', response)
    } catch (error) {
        console.log('resposta errada', error)

      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, sigInWhitGoogle }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
