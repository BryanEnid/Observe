import { GlobalProvider } from "./components/GlobalProvider";
import Routes from "./navigation/routes";
import "./config/ReactotronConfig";
import { View } from "react-native";

export const App = () => {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
};
