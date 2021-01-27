import React from "react";
import { AuthProvider } from "./providers/AuthProvider";
import Routes from "./Routes";
import ApolloProviderContainer from "./providers/ApolloProvider";
import SuperAdminListStudents from "./screens/SuperAdminListStudents";

const App = () => {
  return (
    <ApolloProviderContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApolloProviderContainer>
  );
};

export default App;
