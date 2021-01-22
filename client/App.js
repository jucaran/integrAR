import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./contexts/AuthProvider";
import MyTabs from "./Screens/Tab";
import AuthStack from "./AuthStack";
import CenterView from "./utils/CenterView";

// Apollo client
const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache(),
});

const App = () => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  //We check if the user is logged or not
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       token = await AsyncStorage.getItem("token");
  //       if (token) {
  //         //here we decode the token
  //         login();
  //       } else {
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  // if (loading)
  //   return (
  //     <CenterView>
  //       <ActivityIndicator />
  //     </CenterView>
  //   );

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          {/* {user ? <MyTabs /> : <AuthStack />} */}
          <AuthStack />
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
