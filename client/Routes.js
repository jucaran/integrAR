import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import CenterView from "./utils/CenterView";
import jwt from "jsonwebtoken";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./contexts/AuthProvider";
import MyTabs from "./Screens/Tab";
import AuthStack from "./AuthStack";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // We check if the user is logged or not
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const tokenUser = jwt.decode(token);
          setUser(tokenUser);
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
