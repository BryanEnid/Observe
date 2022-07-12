import { GlobalProvider } from "./components/GlobalProvider";
import Routes from "./navigation/routes";
import { Logger } from "./utils/Logger";

Logger.initialize();

export const App = () => {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
};
