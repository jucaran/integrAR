import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import CenterView from "./utils/CenterView";
import jwt from "jsonwebtoken";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./providers/AuthProvider";
import MyTabs from "./tabs/AdminTabs/Tab";
import AuthStack from "./stacks/AuthStack/AuthStack";

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

  // ACA VOY A HACER UN SWITCH PARA DEFINIR SI ES DOCENTE, ALUMNO O ADMNI (<DecideRole />)
  // return (
  //   <NavigationContainer>
  //     {user ? <DecideRole /> : <AuthStack />}
  //   </NavigationContainer>

  return (
    <NavigationContainer>
      {/* Carga la app antes del login */}
      {user ? <AuthStack /> : <MyTabs />}
    </NavigationContainer>
  );
};

export default Routes;
