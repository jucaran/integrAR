import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import CenterView from "./utils/CenterView";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./contexts/AuthProvider";
import Routes from "./Routes";

// Apollo client
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = AsyncStorage.getItem("token");
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
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
