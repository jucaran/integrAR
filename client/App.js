import React from "react";
import Test from "./Test";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Test />
    </ApolloProvider>
  );
}
