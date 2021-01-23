import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";

export const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
  resetpass: () => {},
  setUser: () => "Testing",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (user) => {
          console.log("Log in triggered", user);
          //Here it should be the API call
          // const newUser = { username: "bob" };
          // try {
          //   setUser(user);
          //   await AsyncStorage.setItem("user", user);
          // } catch (err) {
          //   console.log(err);
          // }
        },
        logout: async () => {
          console.log("Log out triggered");
          try {
            setUser(null);
            await AsyncStorage.removeItem("user");
          } catch (err) {
            console.log(err);
          }
        },
        resetpass: (email) => {
          console.log("Reset password triggered", email);
        },
        setUser: (user) => {
          console.log("Set user triggered");
          // setUser(user);
          return "Testing";
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
