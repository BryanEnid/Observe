import { GlobalProvider } from "./components/GlobalProvider";
import Routes from "./navigation/routes";
import Reactotron from "reactotron-react-native";

if (__DEV__) {
  import("./config/ReactotronConfig").then();
}

Reactotron.log("lol?");
console.log("usual");

export const App = () => {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
};
