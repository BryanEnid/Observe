import { GlobalProvider } from "./components/GlobalProvider";
import Routes from "./navigation/routes";

export const App = () => {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
};
