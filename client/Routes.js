import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import CenterView from "./utils/CenterView";
import jwt from "jsonwebtoken";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./contexts/AuthProvider";
import MyTabs from "./Screens/Tab";
import AuthStack from "./AuthStack";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // We check if the user is logged or not
  useEffect(() => {
    (async () => {
      try {
        // const token = await AsyncStorage.getItem("token");
        const token = { username: "Juanca" };
        if (token) {
          // const user = jwt.decode(token);
          // setUser({ username: "Prueba" });
          console.log(setUser());
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [setUser]);

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );

  return (
    <NavigationContainer>
      {user ? <MyTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
