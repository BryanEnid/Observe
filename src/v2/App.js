import { GlobalProvider } from "./components/GlobalProvider";
import Routes from "./navigation/routes";

if (__DEV__) {
  import("./config/ReactotronConfig").then();
}

export const App = () => {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
};
