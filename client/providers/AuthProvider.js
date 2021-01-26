import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

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
          console.log("Log in triggered");
          console.log("DNI: ", dni);
          console.log("Password", password);
          // try {
          //   await logUser({
          //     variables: { dni, password },
          //   });
          //   if (error) {
          //     console.log(error);
          //     return false;
          //   }
          // setUser(data.user);
          setUser({ dni, name: "Preceptor de ejemplo" });
          // await AsyncStorage.setItem("token", data.token);
          // await AsyncStorage.setItem("user", JSON.stringify(data.user));
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ dni, name: "Preceptor de ejemplo" })
          );
          // } catch (err) {
          //   console.log(err);
          // }
        },
        logout: async () => {
          console.log("Log out triggered");
          try {
            setUser(null);
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
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
