import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./Screens/Tab";
// APOLLO
const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache(),
});
// SCREENS
// const Stack = createStackNavigator();
// const MyStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Test" component={Test} options={{ title: "" }} />
//     </Stack.Navigator>
//   );
// };

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      {/* <NavigationContainer>
        <MyStack />
      </NavigationContainer> */}
    </ApolloProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
