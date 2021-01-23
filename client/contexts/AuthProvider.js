import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import jwt from "jsonwebtoken";

const LOG_USER = gql`
  mutation LogUser($dni: String!, $password: String!) {
    logUser(dni: $dni, password: $password) {
      token
    }
  }
`;

export const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
  resetpass: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logUser, { data, error }] = useMutation(LOG_USER);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: async ({ dni, password }) => {
          console.log("Log in triggered", dni, " ", password);
          console.log("DNI: ", dni);
          console.log("Password", password);
          try {
            await logUser({
              variables: { dni, password },
            });
            if (error) {
              console.log(error);
              return false;
            }
            const newUser = jwt.decode(data.token);
            setUser(newUser);
            await AsyncStorage.setItem("token", data.token);
          } catch (err) {
            console.log(err);
          }
        },
        logout: async () => {
          console.log("Log out triggered");
          try {
            setUser(null);
            await AsyncStorage.removeItem("token");
          } catch (err) {
            console.log(err);
          }
        },
        resetpass: (email) => {
          console.log("Reset password triggered", email);
        },
        setUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
