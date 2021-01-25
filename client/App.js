import React from "react";
import { AuthProvider } from "./providers/AuthProvider";
import Routes from "./Routes";
import ApolloProviderContainer from "./providers/ApolloProvider";
import AddUserStack from "./stacks/AdminStack/AddUserStack";

const App = () => {
  return (
    <ApolloProviderContainer>
      <AuthProvider>
        {/* <Routes /> */}
        <AddUserStack/>
      </AuthProvider>
    </ApolloProviderContainer>
  );
};

export default App;
