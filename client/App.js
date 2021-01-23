import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
<<<<<<< HEAD
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./contexts/AuthProvider";
import MyTabs from "./Screens/Tab";
import AuthStack from "./AuthStack";
import CenterView from "./utils/CenterView";
=======
import { AuthProvider } from "./contexts/AuthProvider";
import Routes from "./Routes";
>>>>>>> f0349c7d369d45731bc87aa7a1f86e40fd2480a0

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
<<<<<<< HEAD
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

 // We check if the user is logged or not
  useEffect(() => {
    (async () => {
      try {
        token = await AsyncStorage.getItem("token");
        if (token) {
          const user = jwt.decode(token);
          setUser(user);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );

=======
>>>>>>> f0349c7d369d45731bc87aa7a1f86e40fd2480a0
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
