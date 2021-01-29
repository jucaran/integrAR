import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import CenterView from "./utils/CenterView";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./providers/AuthProvider";
import MyTabs from "./tabs/AdminTabs/Tab";
import AuthStack from "./stacks/AuthStack/AuthStack";
import UploadClassFile from "./utils/UploadClassFile";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // We check if the user is logged or not
  useEffect(() => {
    (async () => {
      try {
        const storageUser = await AsyncStorage.getItem("user");
        if (storageUser) {
          setUser(JSON.parse(storageUser));
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
    // <NavigationContainer>
    //   {user ? <MyTabs role={user.role} /> : <AuthStack />}
    // </NavigationContainer>
    <UploadClassFile />
  );
};

export default Routes;
