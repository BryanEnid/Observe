import { GlobalProvider } from "./components/GlobalProvider";
import Routes from "./navigation/routes";
import "./config/ReactotronConfig";

export const App = () => {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
};
