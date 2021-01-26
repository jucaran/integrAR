import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_IP } from "@env";

// Apollo client
const httpLink = createHttpLink({
  uri: `http://${LOCAL_IP}:4000/graphql`,
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

const ApolloProviderContainer = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {console.log(LOCAL_IP)}
      {children}
    </ApolloProvider>
  );
};

export default ApolloProviderContainer;
