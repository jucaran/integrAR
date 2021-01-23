import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./contexts/AuthProvider";
import MyTabs from "./Screens/Tab";
import AuthStack from "./AuthStack";

// Apollo client
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = AsyncStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
          {user ? <AuthStack /> : <MyTabs />}
          {/* <AuthStack /> */}
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
